'use strict'

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

function createMasterServer(port) {
  const streamServer = {}
  
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  
  app.route("/stream-servers")
    .get((req,res)=>{
      res.json(streamServer)
    })
    .post((req,res)=>{
      let label =  req.body.label
      streamServer[label] = req.body
      res.json(null)
    })
  
  
  
  app.listen(port)
  console.log(`Master server listens on port: ${port}`);
}


module.exports = createMasterServer

