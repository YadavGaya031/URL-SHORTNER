import { generateSlugAI } from "../services/ai.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";


export const aiSlugController = wrapAsync( async (req, res) => {
    try{
        const { url } = req.body;
    if(!url){
        return res.status(400).json({
            message: "URL is required."
        });
    }
    const slug = await generateSlugAI(url);
    console.log(slug);
    if(!slug){
        return res.status(500).json({
            message: "AI failed to generate slug."
        });
    }
    res.status(200).send(slug);
    }catch(err){
        console.log("AI Error : ", err)
    }
});