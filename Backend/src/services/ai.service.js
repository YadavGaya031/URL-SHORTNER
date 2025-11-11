import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";

export const generateSlugAI = async (url) => {
    try{
        const model = new ChatGroq({
            model: process.env.AI_MODEL,
            apiKey: process.env.GROQ_API_KEY
        });

        const prompt = PromptTemplate.fromTemplate(`
            You are an assistant that generates short, meaningful URL slugs.
            
            Rules: 
            - Use lowercase
            - use hyphens instead of spaces
            - no special characters
            - Max 5 words
            - based on page meaning, not random

            Example: 
            URL: https://www.google.com/
            Slug: google-link

            now create a slug for this: 
            URL: ${url}
            Slug:
            `)
        const finalPrompt = await prompt.format({ url });
        const response = await model.invoke(finalPrompt);
        // console.log(response.content);
        return response.content;
    }catch(err){
        console.log("AI Slug Error: ",err);
        return null;
    }
}