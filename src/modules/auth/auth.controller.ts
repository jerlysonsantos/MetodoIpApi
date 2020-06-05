import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../../database/entity/user.entity'
import ErrorResponse from '../../helpers/error-return'

class AuthController {
  async login(_req: Request, _res: Response) {
    try {
      const { email, password } = _req.body
      const user = await User.findOne({
        where: { email },
      })

      if (!user) return _res.status(401).json({ error: 'Usuário não encontrado!' })

      const isAuth = await bcrypt.compare(password, user.password)

      if (!isAuth) return _res.status(401).json({ error: 'Senha incorreta!' })
      delete user.password

      if (!process.env.JWT_SECRET) return _res.status(500).json({ error: 'Ops! Ocorreu um erro, tente novamente mais tarde.' })

      const token = await jwt.sign({ ...user }, process.env.JWT_SECRET)

      return _res.json({ token, user })
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }
}

export default new AuthController()
