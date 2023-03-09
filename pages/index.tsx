import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Button, Form } from 'react-bootstrap'

import mainImage from '@/assets/images/CraigFurleyMotivationalSpeaker1.png'
import { FormEvent } from 'react'

export default function Home() {

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    console.log("handleSubmit")
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get("prompt")?.toString().trim();
  
    if (prompt) {
      try {
        // setQuote("");
        // setQuoteLoadingError(false);
        // setQuoteLoading(true);
  
        const response = await fetch("/api/cringe?prompt=" + encodeURIComponent(prompt));
        const body = await response.json();
        console.log(body)
        // setQuote(body.quote);
      } catch (error) {
        console.error(error);
        // setQuoteLoadingError(true);
      } finally {
        // setQuoteLoading(false);
      }
    }
  }
  

  return (
    <>
      <Head>
        <title>Life Motivation AI Coach Charlly Finely</title>
        <meta name="description" content="Charlly Finely motivates YOU!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Charlly Finely</h1>
        <h5>AI Motivational Life Coach</h5>
        <p>"Help <i>me</i> help <i>YOU!</i></p>
        <br/>

        {/* <img src="../../assets/images/CraigFurleyMotivationalSpeaker1.png" alt="Craig Furley" height="200"/> */}
        <div className={styles.mainImageContainer}>
          <Image 
            src={ mainImage } 
            // width={ 200 } 
            fill
            alt={ "Craig Furley"}
            priority // preload image & optimization for above-fold content
            className={styles.mainImage}
          />
        </div>
        <p>Powered by FinelySuccessAI™</p>
        <br/>

        <div>Enter a topic and Charlly will generate a SUPER motivational quote</div>

        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <Form.Group className='mb-3' controlId='prompt-input'>
            <Form.Label>Create a cringy quote about...</Form.Label>
            <Form.Control
              name='prompt'
              placeholder='e.g. success, fear, potatoes'
              maxLength={100}
            />
          </Form.Group>
          {/* <Button type='submit' className='mb-3' disabled={quoteLoading}> */}
          <Button type='submit' className='mb-3' >
            Motivate Me Charlly!
          </Button>
        </Form>
        {/* {quoteLoading && <Spinner animation='border' />}
        {quoteLoadingError && "Something went wrong. Please try again."}
        {quote && <h5>{quote}</h5>} */}

      </main>
    </>
  )
}


