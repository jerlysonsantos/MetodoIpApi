import { config } from 'dotenv'
import server from 'http'
import 'reflect-metadata'
import startConnection from './database'
import app from './server'
import io from 'socket.io'

const serverStart = server.createServer(app)
const ioInstance = io.listen(serverStart)

import SocketIo from './modules/socketIo'

config()
startConnection().then(() => {

  const PORT = 3079


  new SocketIo(ioInstance)

  serverStart.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
})
