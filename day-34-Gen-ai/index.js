import 'dotenv/config';
import readline from "readline/promises";
import { MistralAI } from "@langchain/mistralai";
import { HumanMessage } from 'langchain';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const mistalAI = new MistralAI({
  model: 'ministral-8b-latest',
  apiKey: process.env.MISTRAL_API_KEY
});

const messages = []


while (true) {

  const userInput = await rl.question('You:');
  messages.push(new HumanMessage(userInput));


  const response = await mistalAI.invoke(messages);
  messages.push(response)
  console.log("Response from MistralAI:", response);
}

rl.close();
