import { Request, Response } from "express";
import UserService from "../services/userService";
import User from "../Dto/UserDto";

let register = async (req: Request, res: Response) => {
  try {
    const { email, nombres, apellidos, telefono, password } = req.body;
    const user = new User(email, nombres, apellidos, telefono, password);
    const result = await UserService.register(user);
    return res.status(201).send({
      status: "register ok",
    });
  } catch (error: any) {
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage });
    }
  }
};

export default register;
