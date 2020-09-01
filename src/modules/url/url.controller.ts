import { Request, Response } from "express";
import { Url } from "../../database/entity/url.entity";
import ErrorResponse from "../../helpers/error-return";

class UrlController {
  async getUrl(_req: Request, _res: Response) {
    try {
      const getEntity = await Url.findOne();

      return _res.json({ getEntity });
    } catch (err) {
      return ErrorResponse(_res, err);
    }
  }

  async setUrl(_req: Request, _res: Response) {
    try {
      const body: Url = _req.body;

      if (!body.id.length) {
        const result = await Url.create({
          ...body,
        }).save();
        return _res.json({ result });
      }

      const update = await Url.update({ id: body.id }, { ...body });

      return _res.json({ update });

    } catch (err) {
      console.log(err);
      return ErrorResponse(_res, err);
    }
  }
}

export default new UrlController();
