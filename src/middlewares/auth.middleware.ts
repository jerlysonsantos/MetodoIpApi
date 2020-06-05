import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../database/entity/user.entity'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    if (typeof authorization === 'string' && process.env.JWT_SECRET) {
      const split = authorization.split(' ')
      const token = split[1]
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findOne(decoded.id)
      return next()
    }

    return res.status(401).json({
      message:
        'Usuário não encontrado! É obrigatório passar um token no cabeçalho.'
    })
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido!' })
  }
}
