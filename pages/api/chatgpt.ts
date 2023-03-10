// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

declare global {
  interface String {
    trimIndent(): string
  }
}

String.prototype.trimIndent = function () {
  // Remove leading whitespace from each line
  // and remove empty lines
  const lines = this.split('\n')
  const trimmedLines = lines.map((line) => line.trim())
  const filteredLines = trimmedLines.filter((line) => !isBlankString(line))

  return filteredLines.join('\n')
}

const config = new Configuration(
  {
    apiKey: process.env.OPENAI_API_KEY,
    //basePath: 'https://api.openai.com',
  }
)

const openai = new OpenAIApi(config)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query)
  const prompt = req.query.prompt as string

  if(prompt.length==0 || !prompt) return res.status(400).json({error: 'No prompt provided'})
  if(prompt.length > 100) return res.status(400).json({error: 'Prompt too long'})

  const promptContext = `
     Create a motivational quote that gives the opposite of good advice in the style of Chris Farley on the following Topic:
      Topic: ${prompt}

      DO NOT SIGN YOUR NAME TO THE QUOTE

      Motivational Quote:
  `.trimIndent()

  const request = {
    model: "text-davinci-003",
    prompt: promptContext,
    max_tokens: 500,
    temperature: 0.9,
    // top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    // stop: ['\n', ' Human:', ' AI:'],
  }

  try {
    const completion = await openai.createCompletion(request)
    const response = completion.data.choices[0].text
    res.status(200).json({ response })
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Something went wrong'})
  }
}

// Check if string is empty or only contains whitespace
function isBlankString(str): boolean {
  if (str.length === 0) return true

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') return false
  }

  return true
}