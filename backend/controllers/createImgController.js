import {generateImage} from '../api/api.js';
export const createImg = async (req, res) => {
    try {
        const inputPrompt = req.body;
        if(!inputPrompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }
        const image_url = await generateImage(inputPrompt);
        return res.status(200).json({ image_url });
    } catch (err) {
        console.log(err);
    }
};