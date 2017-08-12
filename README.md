# Real Time Graph application

## Setup Environment
```bash
# 1. install all the dependencies of frontend and backend
bash init.sh 

# 2. open a new terminal then run backend
cd backend && npm start

# 3. open a new terminal then run frontend
cd frontend && npm start

# 4. see the frontend page on 'localhost:4200'
```

here is a screenshot:

![screenshot](https://github.com/YuhanWang91/graph-server/blob/master/tutorial.gif)


## System Design

### backend (Express + Socket.io)
In backend, we have 1 master server and 3 stream server.

#### Master Server ([backend/master-server.js](https://github.com/YuhanWang91/graph-server/blob/master/backend/master-server.js))

The master server stores every stream server's **label** and **url endpoint**(used by socket.io). 

It has 2 RESTful endpoint:

* ```GET /stream-servers```: list all stream server's information (label + url endpoint). The frontend get stream server information from this endpoint
* ```POST /stream-servers```: add a new stream server information to master-server. Every time we create a new stream server, we call this endpoint to add its information to master server


#### Stream Server ([backend/stream-server.js](https://github.com/YuhanWang91/graph-server/blob/master/backend/stream-server.js))
The stream server will create a socket.io endpoint which emit (x,y) pair once it has been started.
In ```backend/index.js```, we create 3 stream-server which generate curve:

* stream-server-1: y = x 
* stream-server-2: y = x^(1/2)
* stream-server-3: y = x^(1/3)

x starts from 0 and increase by 1 every 1 second

#### Frontend (Angular 4 + Socket.io)
* [GraphService](https://github.com/YuhanWang91/graph-server/blob/master/frontend/src/app/graph.service.ts): get stream server information from master server and setup socket connection with stream server
* [AppComponent](https://github.com/YuhanWang91/graph-server/blob/master/frontend/src/app/app.component.ts): display a ```<select>``` element to let user choose which stream server they want to subscribe,
once user choose a new stream server, it will close the previous socket connection and setup a new socket connection to the selected stream server.  
there is line chart below the ```<select>``` to draw the curve of the data emit by current stream server.




