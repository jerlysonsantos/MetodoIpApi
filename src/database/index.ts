import path from 'path'
import { createConnection } from 'typeorm'

const startConnection = async () => {
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, '/entity/*.entity{.ts,.js}')],
  })
}

export default startConnection
