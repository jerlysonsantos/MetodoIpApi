import { Request, Response } from 'express'
import { Lead } from '../../database/entity/lead.entity'
import { User } from '../../database/entity/user.entity'
import ErrorResponse from '../../helpers/error-return'
import Paginate from '../../helpers/paginate'
import SuccessListResponse from '../../helpers/success-return'

class UserController {
  async me(_req: Request, _res: Response) {
    return _res.send({ ..._req.user })
  }

  async list(_req: Request, _res: Response) {
    try {
      const getPaginate = Paginate(_req)
      const getEntity = await User.findAndCount({
        ...getPaginate,
      })

      const users = getEntity[0].map((user) => {
        delete user.password
        return user
      })

      return SuccessListResponse(_req, _res, [users, getEntity[1]])
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }

  async getOne(_req: Request, _res: Response) {
    try {
      const { id } = _req.params
      const user = await User.findOne({ id })
      if (!user) throw Error('Not found!')
      delete user.password

      return _res.jsonp({ ...user })
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }

  async getLead(_req: Request, _res: Response) {
    try {
      const { id } = _req.params
      const lead = await Lead.findOne({ id })
      if (!lead) throw Error('Not found!')

      return _res.jsonp({ ...lead })
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }

  async update(_req: Request, _res: Response) {
    try {
      const { id } = _req.params
      delete _req.body.password
      await User.update(id, { ..._req.body })
      const user = await User.findOne(id)
      if (!user) throw Error('Not found!')

      return _res.jsonp({ ...user })
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }

  async delete(_req: Request, _res: Response) {
    try {
      const { id } = _req.params
      const user = await User.findOne(id)
      if (!user) throw Error('Not found!')
      await User.delete(id)

      return _res.jsonp({ ...user })
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }

  async create(_req: Request, _res: Response) {
    try {
      const isExistLead = await Lead.findOne({ email: _req.body.email })
      if (!isExistLead) return _res.json({ error: 'Usuário não cadastrado' })

      const body: User = _req.body
      const result = await User.create({
        ...body,
      }).save()

      return _res.json({ result })
    } catch (err) {
      console.log(err)
      return ErrorResponse(_res, err)
    }
  }

  async lead(_req: Request, _res: Response) {
    try {
      const body: User = _req.body
      const result = await Lead.create({
        ...body,
      }).save()

      return _res.json({ result })
    } catch (err) {
      console.log(err)
      return ErrorResponse(_res, err)
    }
  }
}

export default new UserController()
