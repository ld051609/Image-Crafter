import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    organization: "org-YO5hZMQ7SNbZ8TDNz2aRKSOH",
    project: "proj_A8G5sob0fc2bLRqLYSyofsSV",
    apiKey: process.env.OPEN_API_KEY
})
export default async function generateImage() {
    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: "a white siamese cat",
        n: 1,
        size: "1024x1024",
    });
    const image_url = response.data[0].url;
    console.log(image_url)

}


