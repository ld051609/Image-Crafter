import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    organization: "org-YO5hZMQ7SNbZ8TDNz2aRKSOH",
    project: "proj_A8G5sob0fc2bLRqLYSyofsSV",
    apiKey: process.env.OPEN_API_KEY
})
export default async function generateImage(inputPrompt) {
    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: inputPrompt,
        n: 1,
        size: "512x512", 
    });
    const image_url = response.data[0].url;
    console.log(image_url)
    return image_url;

}


