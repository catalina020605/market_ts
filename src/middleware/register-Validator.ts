import { Request, Response, NextFunction } from "express";
import { check, validationResult } from 'express-validator';

// validadores
const validatorParams = [
  check('email').isEmail().withMessage('Debe ser un email válido'),
  check('password').isLength({ min: 8, max: 15 }).withMessage('La contraseña debe tener entre 8 y 15 caracteres'),
  check('nombres').isLength({ min: 1, max: 255 }).withMessage('El nombre es requerido y debe tener máximo 255 caracteres'),
  check('apellidos').isLength({ min: 1, max: 255 }).withMessage('El apellido es requerido y debe tener máximo 255 caracteres'),
  check('telefono').isLength({ min: 10, max: 15 }).withMessage('El teléfono debe tener entre 10 y 15 caracteres')
];

function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

export { validatorParams, validator };