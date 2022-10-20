const { response } = require('express');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

const data = [
  {
    name  : "Rich",
    age   : 32,
    dream : "retired"
  },
  {
    name  : "Drew",
    age   : 32,
    dream : "XRPillionaire"

  },
  {
    name  : "Jack",
    age   : 36,
    dream : "ReFi Dev"

  }]

  const reqAPI = 'https://api.sampleapis.com/codingresources/codingResources';

  app.get('/resources', async(req,res)=>{
    console.log('resources');
    const reqAPIResult = await axios.get(reqAPI);
    res.json(reqAPIResult.data);
  })

app.get('/', (request,response)=>{
  response.send('<h1>Hello World</h1>');
})

app.get('/rich', (req, res)=>{
  res.send('<h1>Rich is awesome</h1>');
})

app.get('/data', (req, res)=>{
  res.json(data);
})

app.listen(8801, ()=>{
  console.log('http://localhost:8801');
})