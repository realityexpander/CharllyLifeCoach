import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Button, Form, Spinner } from 'react-bootstrap'
import { FormEvent, useState } from 'react'

import charllyTopImage from '@/assets/images/CraigFurleyMotivationalSpeaker1.png'
import charllyGoForIt from '@/assets/images/CharllyGoForIt.png'

export default function Home() {

  const [quote, setQuote] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get("prompt")?.toString().trim();
  
    if (prompt) {
      try {
        setQuote("");
        setQuoteLoadingError(false);
        setQuoteLoading(true);
  
        const response = await fetch("/api/chatgpt?prompt=" + encodeURIComponent(prompt));
        const body = await response.json();
        setQuote(body.response);
      } catch (error) {
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Charlly the Finely: The Finest Life Motivation AI Coach</title>
        <meta name="description" content="Charlly Finely motivates YOU!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Charlly the Finely</h1>
        <h5>Finest AI Motivational Life Coach</h5>
        <p>Help <i>me</i> help <i>YOU!</i></p>
        {/* <br/> */}

        {/* <img src="../../assets/images/CraigFurleyMotivationalSpeaker1.png" alt="Craig Furley" height="200"/> */}
        <div className={styles.mainImageContainer}>
          <Image 
            src={ charllyTopImage } 
            // width={ 200 } 
            fill
            alt={ "Charlly Finely"}
            priority // preload image & optimization for above-fold content
            className={styles.mainImage}
          />
        </div>
        {/* <p>Powered by FinelySuccessAI™</p> */}
        {/* <br/> */}

        {/* <h5>Enter a topic and Charlly will generate a SUPER MOTIVATIONAL suggestion</h5> */}
        {/* <p>For'ie, Fohre!</p> */}

        <br/>
        <br/>

        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <Form.Group className='mb-3' controlId='prompt-input'>
            <Form.Label>Charlly, give me the Finelyest advice about...</Form.Label>
            <Form.Control
              name='prompt'
              placeholder='e.g. money, love, health'
              maxLength={100}
            />
          </Form.Group>
          {/* <Button type='submit' className='mb-3' disabled={quoteLoading}> */}
          <Button type='submit' className='mb-3' >
            Help Me Charlly!
          </Button>
        </Form>

        {quoteLoading && <Spinner animation='border' />}
        {quoteLoadingError && "Something went wrong. Please try again."}
        {quote && 
          <>
              <div className="d-flex flex-row justify-content-start">
              <div className="p-2">
                <Image
                  src = { charllyGoForIt }
                  alt = { "Charlly the Finely"}
                  height = { 150 }
                  className={styles.goForItImage}
                />
              </div>
              <div className="p-2">
                <h5>Charlly says:</h5>
                <p> { quote } </p>
              </div>
            </div>
          </>
        }

      </main>
    </>
  )
}


