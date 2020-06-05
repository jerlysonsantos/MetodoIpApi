import { Request, Response } from 'express'
import { BaseEntity } from 'typeorm'
import { DEFAULT_PERPAGE } from './paginate'

export default <T extends BaseEntity>(
  req: Request,
  res: Response,
  entity: [T[], number]
) => {
  let { page, perpage }: any = req.query
  if (!page) page = 1
  if (!perpage) perpage = DEFAULT_PERPAGE
  if (typeof perpage === 'string' && typeof page === 'string') {
    perpage = parseInt(perpage) > 100 ? 100 : parseInt(perpage)
    page = parseInt(page)
  }

  const lastpage =
    Math.round(entity[1] / perpage) > 0 ? Math.round(entity[1] / perpage) : 1

  return res.jsonp({
    perpage,
    page,
    lastpage,
    total: entity[1],
    result: entity[0]
  })
}
