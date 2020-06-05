import { Request, Response } from 'express'
import { QuestionTest } from '../../database/entity/question_test.entity'
import { User } from '../../database/entity/user.entity'
import ErrorResponse from '../../helpers/error-return'
import Paginate from '../../helpers/paginate'
import SuccessListResponse from '../../helpers/success-return'

class QuestionController {
  async list(_req: Request, _res: Response) {
    try {
      const getPaginate = Paginate(_req)
      const getEntity = await QuestionTest.findAndCount({
        ...getPaginate,
        // where: { user: _req.user },
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

      const where: any = {}
      if (_req.query.selected) where.selected = _req.query.selected

      const getEntity = await QuestionTest.findAndCount({
        ...getPaginate,
        where,
        // relations: ['user'],
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
      const body: QuestionTest = _req.body
      const result = await QuestionTest.create({
        ...body,
        // user: _req.user,
      }).save()

      return _res.json({ result })
    } catch (err) {
      console.log(err)
      return ErrorResponse(_res, err)
    }
  }

  async select(_req: Request, _res: Response) {
    try {
      const { id } = _req.params
      const question = await QuestionTest.findOne(id)
      if (!question) throw Error('Not found!')

      await QuestionTest.update(id, { selected: !question.selected })

      return _res.jsonp({ id, selected: !question.selected })
    } catch (err) {
      return ErrorResponse(_res, err)
    }
  }
}

export default new QuestionController()
