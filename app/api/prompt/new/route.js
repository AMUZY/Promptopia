import { connectToDB } from "@utils/database"
import Prompt from '@models/prompt'

export const POST = async (req, res) =>{
    const { userid, prompt, tag } = await req.json()
    console.log('post request running...')
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userid,
            prompt : prompt,
             tag : tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status : 201})
    } catch(error){
        console.log(error);
        return new Response('Failed to create a new prompt',{status : 500})
    }
}
