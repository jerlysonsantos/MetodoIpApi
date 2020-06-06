import { config } from 'dotenv'
import server from 'http'
import 'reflect-metadata'
import startConnection from './database'
import app from './server'

const serverStart = server.createServer(app)
// const ioInstance = io.listen(serverStart)

// const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms))

config()
startConnection().then(() => {
  // eslint-disable-next-line no-console
  const PORT = 3079
  // const SETTINGS = 'e0b54b54-a0ba-447e-a387-3674a2f1c3c4'

  // let putzz = 0

  // setInterval(() => {
  //   putzz = 0
  //   ioInstance.emit('putzz_result', putzz)
  // }, 60000)
  // ioInstance.on('connection', function (socket: any) {
  //   console.log('connect')
  //   socket.on('putzz', async function (_msg: any) {
  //     // const { putzz }: any = await Settings.findOne('e0b54b54-a0ba-447e-a387-3674a2f1c3c4')
  //     // await waitFor(1000)
  //     // Settings.update('e0b54b54-a0ba-447e-a387-3674a2f1c3c4', { putzz: _msg + 1 }).then((_v: UpdateResult) => {
  //     //   console.log(_msg + 1)
  //     //   ioInstance.emit('putzz_result', _msg + 1)
  //     // })
  //     // const { putzz }: any = await Settings.findOne('e0b54b54-a0ba-447e-a387-3674a2f1c3c4')
  //     console.log(_msg)
  //     if (_msg >= 100) return
  //     putzz = _msg + 0.33
  //     ioInstance.emit('putzz_result', putzz)
  //   })
  // })

  // app.get('/v1/block', async (_req: any, _res: any) => {
  //   const { block_anwser }: any = await Settings.findOne(SETTINGS)
  //   await Settings.update(SETTINGS, { block_anwser: !block_anwser })
  //   ioInstance.emit('block_anwser', !block_anwser)
  //   return _res.json({ block: !block_anwser })
  // })

  // app.get('/v1/block/status', async (_req: any, _res: any) => {
  //   const { block_anwser }: any = await Settings.findOne(SETTINGS)
  //   return _res.json({ block_anwser })
  // })

  serverStart.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
})
