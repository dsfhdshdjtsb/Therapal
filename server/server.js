const express = require("express");
const cors = require('cors')
require('dotenv').config()
var bodyParser = require('body-parser')
const { Configuration, OpenAIApi } = require("openai");

const PORT = process.env.PORT || 3001;

const app = express();
var jsonParser = bodyParser.json()

//exposed api key but idrc
const configuration = new Configuration({

  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
async function runCompletion(messages){
    const completion = openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
  })
  .then((res) =>{
      console.log(res.data.choices[0].message.content);
  })
  .catch((err) =>{
      console.log(err)
  })
  
}



app.use(cors({
    origin: "*"
}))
// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//     console.log(req)
//   });
app.post("/api", jsonParser, (req, res) => {
  const { prompt } = req.body;
  console.log(prompt)
  const completion = openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
  })
  .then((result) =>{
      console.log(result.data.choices[0].message.content);
      res.json({message: result.data.choices[0].message.content})
  })
  .catch((err) =>{
      console.log(err)
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});