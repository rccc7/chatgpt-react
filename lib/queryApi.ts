import openai from "./chatgpt";
// Here, we are not using the chatId, but it could be useful in future versions
// in which we can get the chat history and have the context of the conversation with chatGPT
const query = async(prompt: string, chatId: string, model:string)=>{
// This is were we make a request to ChatGPT:
    const res = await openai.createCompletion({
        model, //Model to be used by chatGpt by default text-davinci
        prompt,
        temperature: 0.9, // Tell chatGpt to be creative in its responses
        top_p:1, // top probability. Used to manipulate different responses from the model.
        max_tokens: 1000, //Limit the number of tokens to 1000 (not sure what it is used but just put this middle value since the maximum value is 2048)
        frequency_penalty: 0,
        presence_penalty:0,
        // The responses will give as 3 choices; however, we just select the first one. 
    }).then(res=>res.data.choices[0].text)
    .catch(err=>`ChatGPT was unable to find an answer for your question (Error: ${err
        .message})`);
    // 👆👆👆 An error can occur when there are too many requests which could happen when making tests

    return res;
}

export default query;