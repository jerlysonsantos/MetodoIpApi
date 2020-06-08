import { Request, Response } from 'express'
import { Question } from '../../database/entity/question.entity'
import { User } from '../../database/entity/user.entity'
import ErrorResponse from '../../helpers/error-return'
import Paginate from '../../helpers/paginate'
import SuccessListResponse from '../../helpers/success-return'

class QuestionController {
  async list(_req: Request, _res: Response) {
    try {
      const getPaginate = Paginate(_req)
      const getEntity = await Question.findAndCount({
        ...getPaginate,
        where: { user: _req.user },
        order: { created_at: 'DESC' },
      })

      return SuccessListResponse(_req, _res, [getEntity[0], getEntity[1]])
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }

  async listAll(_req: Request, _res: Response) {
    try {
      const getPaginate = Paginate(_req)

      const where: any = { is_active: true }
      if (_req.query.selected) where.selected = _req.query.selected

      const getEntity = await Question.findAndCount({
        ...getPaginate,
        where,
        relations: ['user'],
        order: { created_at: 'DESC' },
      })

      return SuccessListResponse(_req, _res, [getEntity[0], getEntity[1]])
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
      const body: Question = _req.body

      // const question = await Question.findOne({ text: _req.body.text })
      // if (question) throw Error('Já existe essa pergunta!')

      // const result = await Question.create({
      //   ...body,
      //   user: _req.user,
      // }).save()

      return _res.json({ result })
    } catch (err) {
      console.log(err)
      return ErrorResponse(_res, err)
    }
  }

  async select(_req: Request, _res: Response) {
    try {
      const { id } = _req.params
      const question = await Question.findOne(id)
      if (!question) throw Error('Not found!')

      await Question.update(id, { selected: !question.selected })

      return _res.jsonp({ id, selected: !question.selected })
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }

  async update(_req: Request, _res: Response) {
    try {
      const { id } = _req.params
      const body = _req.body
      const question = await Question.findOne(id)
      if (!question) throw Error('Not found!')

      const result = await Question.update(id, { ...body })

      return _res.jsonp(result)
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }

  async rate(_req: Request, _res: Response) {
    try {
      const { rate }: any = _req.params
      const user = await User.update(_req.user.id, { rate })

      return _res.jsonp({ ...user })
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }

  async getRate(_req: Request, _res: Response) {
    try {
      return _res.jsonp({ ..._req.user })
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }
}

export default new QuestionController()
