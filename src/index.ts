import { config } from 'dotenv'
import server from 'http'
import 'reflect-metadata'
import startConnection from './database'
import app from './server'

const serverStart = server.createServer(app)
config()
startConnection().then(() => {

  const PORT = 3079

  serverStart.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
}).catch((error) => console.log(error))
