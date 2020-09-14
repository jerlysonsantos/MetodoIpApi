import { config } from 'dotenv'
import server from 'http'
import 'reflect-metadata'
import startConnection from './database'
import app from './server'

import io from 'socket.io';

const serverStart = server.createServer(app)
const ioInstance = io.listen(serverStart,  {
  pingInterval: 10000,
  pingTimeout: 10000,
  cookie: false
})

import SocketIo from './modules/socketIo'

config()
startConnection().then(() => {

  const PORT = 3079


  new SocketIo(ioInstance)

  serverStart.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
}).catch((error) => console.log(error))
