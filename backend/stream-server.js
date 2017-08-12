'use strict'

const socketio = require('socket.io');
const express = require('express');
const http = require('http');
const cors = require('cors');




function createStream(order) {
  let counter = 0
  const clients = []
  setInterval(()=>{
    for (let socket of clients) {
      socket.emit("data",{
        x:counter,
        y:Math.pow(counter,order)
      })
    }
    // console.log(clients.length);
    ++counter
  },1000)
  
  return clients
}



function createStreamServer(label, port, order) {
  const app = express()
  app.use(cors())
  const server = http.Server(app)
  const io = socketio(server)
  
  server.listen(port)
  
  
  const clients = createStream(order)
  
  io.on("connection",(socket)=>{
    clients.push(socket)
    
    socket.on("disconnect",()=>{
      clients.splice(clients.indexOf(socket))
    })
    
  })
  
  
  
  console.log(`stream server with label: [${label}] listen on port: ${port}`);
  
}

module.exports = createStreamServer