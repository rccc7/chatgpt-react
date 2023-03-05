// Api call to get chatGpt engines
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import openai from '../../lib/chatgpt'

type Option={
    value:string;
    label: string;
};

type Data = {
    modelOptions: Option[];
};

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse<Data>
){
    // Call to openAI to list the models and return the data contained.
    // Inside the data it is literally the data we want to get. That's why we 
    // call res.data.data
    const models = await openai.listModels().then((res)=>res.data.data);

    const modelOptions = models.map(model=>({
        value:model.id,
        label:model.id,
    }));

    res.status(200).json({
        modelOptions,
    })
}