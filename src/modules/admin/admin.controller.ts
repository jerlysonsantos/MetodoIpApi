import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Admins } from "../../database/entity/admin.entity";
import ErrorResponse from "../../helpers/error-return";

class AdminController {
  async index(_req: Request, _res: Response) {
    try {
      const admins = await Admins.find({
        select: ["id", "name", "email", "can_answer", "can_reply", "can_users"],
        order: {
          created_at: "ASC",
        },
      });

      return _res.json(admins);
    } catch (err) {
      return ErrorResponse(_res, err);
    }
  }

  async create(_req: Request, _res: Response) {
    try {
      const body: Admins = _req.body;

      const { email } = body;

      const find = await Admins.findOne({
        where: { email },
      });

      if (find) {
        return _res.status(401).json({
          error: "E-mail já cadastrado",
        });
      }

      const admin = await Admins.create({
        ...body,
      }).save();

      return _res.json(admin);
    } catch (err) {
      return ErrorResponse(_res, err);
    }
  }

  async update(_req: Request, _res: Response) {
    try {
      const body: Admins = _req.body;
      const { id } = _req.params;

      const find = await Admins.findOne({
        where: { id },
      });

      if (!find) {
        return _res.status(401).json({
          error: "Admin não encontrado",
        });
      }

      const admin = await Admins.update(id, { ...body });

      return _res.json(admin);
    } catch (err) {
      return ErrorResponse(_res, err);
    }
  }

  async delete(_req: Request, _res: Response) {
    try {
      const { id } = _req.params;
      const admin = await Admins.findOne(id);
      if (!admin) throw Error("Not found!");
      await Admins.delete(id);

      return _res.jsonp({ ...admin });
    } catch (err) {
      return ErrorResponse(_res, err);
    }
  }

  async login(_req: Request, _res: Response) {
    try {
      const { email, password } = _req.body;
      const user = await Admins.findOne({
        where: { email },
        order: { created_at: "DESC" },
      });

      if (!user)
        return _res.status(401).json({ error: "Usuário não encontrado!" });

      const isAuth = await bcrypt.compare(password, user.password);

      if (!isAuth) return _res.status(401).json({ error: "Senha incorreta!" });
      delete user.password;

      if (!process.env.JWT_SECRET)
        return _res
          .status(500)
          .json({ error: "Ops! Ocorreu um erro, tente novamente mais tarde." });

      const token = await jwt.sign({ ...user }, process.env.JWT_SECRET);

      return _res.json({ token, user });
    } catch (err) {
      return ErrorResponse(_res, err);
    }
  }
}

export default new AdminController();
