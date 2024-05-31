import express from "express";
import authController from '../controllers/auth-controller';
const validatorAuth = require('../middleware/auth-validator');
const router = express.Router();


router.post('/auth', validatorAuth.validatorParams, validatorAuth.validator, authController);


export default router;
