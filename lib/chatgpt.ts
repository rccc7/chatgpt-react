import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,

})

// Get access to the openAI api:
const openai = new OpenAIApi(configuration);

export default openai;