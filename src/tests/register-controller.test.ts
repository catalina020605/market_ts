import { Request, Response } from 'express';
import register from '../controllers/register-controller';
import UserService from '../services/userService';

// Mock del servicio de usuario
jest.mock('../services/userService');

describe('Register Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it('should return 201 and status "register ok" for successful registration', async () => {
    const mockUserService = UserService as jest.Mocked<typeof UserService>;
    mockUserService.register.mockResolvedValueOnce({} as any);

    req.body = {
      documento: '1234567890',
      email: 'camilo@gmail.com',
      nombres: 'camilo',
      apellidos: 'Balsero',
      telefono: '3182831280',
      password: 'camilo123'
    };

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ status: 'register ok' });
  });

  it('should return 500 with error info if registration fails due to duplicate entry', async () => {
    const mockUserService = UserService as jest.Mocked<typeof UserService>;
    const error = new Error('Duplicate entry') as any;
    error.code = 'ER_DUP_ENTRY';
    error.sqlMessage = 'Duplicate entry';
    mockUserService.register.mockRejectedValueOnce(error);

    req.body = {
      documento: '1234567890',
      email: 'camilo@gmail.com',
      nombres: 'camilo',
      apellidos: 'Balsero',
      telefono: '3182831280',
      password: 'camilo123'
    };

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ errorInfo: 'Duplicate entry' });
  });
});
