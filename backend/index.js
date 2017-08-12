'use strict'
const request = require('request');
const createMasterServer = require('./master-server');
const createStreamServer = require('./stream-server');

function registerStreamServerToMasterServer(masterServerPort, streamServerInfo) {
  return new Promise((resolve,reject)=>{
    request.post(`http://localhost:${masterServerPort}/stream-servers`,{
      json:{
        label:streamServerInfo.label,
        url:`http://localhost:${streamServerInfo.port}`
      }
    },(error,res,body)=>{
      if (error || res.statusCode != 200) {
        reject(error || body)
      }
      else {
        resolve(body)
      }
    })
  })
}
const MASTER_SERVER_PORT = 3311
createMasterServer(MASTER_SERVER_PORT)

let streamServerInfos = []
for (let i= 1; i < 4;i++){
  let streamServerLabel = `stream-server-${i}`
  let streamServerPort = MASTER_SERVER_PORT + i
  createStreamServer(streamServerLabel,streamServerPort, 1/i)
  streamServerInfos.push({
    label:streamServerLabel,
    port:streamServerPort
  })
  
}

Promise.all(streamServerInfos.map(info=>registerStreamServerToMasterServer(MASTER_SERVER_PORT,info))).then(()=>{
  console.log("all stream servers registered in master server");
}).catch((err)=>{
  console.log("stream server register fail");
})



