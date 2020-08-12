import { Request, Response } from "express";
import { Palestrante } from "../../database/entity/palestrante.entity";
import ErrorResponse from "../../helpers/error-return";
import SuccessListResponse from "../../helpers/success-return";

class PalestranteController {
  async list(_req: Request, _res: Response) {
    try {
      const getEntity = await Palestrante.findAndCount({
        order: { created_at: "DESC" },
      });

      return SuccessListResponse(_req, _res, [getEntity[0], getEntity[1]]);
    } catch (err) {
      return ErrorResponse(_res, err);
    }
  }

  async delete(_req: Request, _res: Response) {
    try {
      const { id } = _req.params;
      const palestrante = await Palestrante.findOne(id);
      if (!palestrante) throw Error("Not found!");
      await Palestrante.delete(id);

      return _res.jsonp({ ...palestrante });
    } catch (err) {
      return ErrorResponse(_res, err);
    }
  }

  async create(_req: Request, _res: Response) {
    try {
      const body: Palestrante = _req.body;

      const result = await Palestrante.create({
        ...body,
      }).save();

      return _res.json({ result });
    } catch (err) {
      console.log(err);
      return ErrorResponse(_res, err);
    }
  }

  async update(_req: Request, _res: Response) {
    try {
      const { id } = _req.params;
      const body = _req.body;
      const palestrante = await Palestrante.findOne(id);
      if (!palestrante) throw Error("Not found!");

      const result = await Palestrante.update(id, { ...body });

      return _res.jsonp(result);
    } catch (err) {
      return ErrorResponse(_res, err);
    }
  }
}

export default new PalestranteController();
