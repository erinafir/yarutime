const OpenAI = require ("openai")
require('dotenv').config()

module.exports = async function openAi(prompt){
    // console.log(process.env.OPENAI_API_KEY);
    const openai = new OpenAI({
        apiKey : process.env.OPENAI_API_KEY
    });
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." },
        {role : "user", content : prompt}
      ],
      model: "gpt-3.5-turbo",
    });
    // console.log(completion.choices[0].message);
    return completion.choices[0].message.content
}