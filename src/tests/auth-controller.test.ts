import { Request, Response } from 'express';
import auth from '../controllers/auth-controller';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { generateToken } from '../helpers/jwt-Helper';
import Auth from '../Dto/authDto';

// Mock del servicio de usuario y helper de JWT
jest.mock('../repositories/UserRepository');
jest.mock('bcryptjs');
jest.mock('../helpers/jwt-Helper');

describe('Auth Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 200 and a token for successful authentication', async () => {
    const mockUserRepository = UserRepository as jest.Mocked<typeof UserRepository>;
    const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
    const mockGenerateToken = generateToken as jest.MockedFunction<typeof generateToken>;

    mockUserRepository.login.mockResolvedValueOnce([[{ password: 'hashed_password' }], []] as any);
    mockBcrypt.compare.mockResolvedValueOnce(true as never);
    mockGenerateToken.mockReturnValue('mocked_token');

    req.body = {
      email: 'camilo@gmail.com',
      password: 'camilo123',
    };

    await auth(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: 'correct username and password', token: 'mocked_token' });
  });

  it('should return 401 for incorrect username or password', async () => {
    const mockUserRepository = UserRepository as jest.Mocked<typeof UserRepository>;
    const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

    mockUserRepository.login.mockResolvedValueOnce([[], []] as any);
    mockBcrypt.compare.mockResolvedValueOnce(false as never);

    req.body = {
      email: 'camilo@gmail.com',
      password: 'camilo123',
    };

    await auth(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ status: 'incorrect username or password' });
  });

  it('should return 500 for internal server error', async () => {
    const mockUserRepository = UserRepository as jest.Mocked<typeof UserRepository>;

    mockUserRepository.login.mockRejectedValueOnce(new Error('Internal Server Error'));

    req.body = {
      email: 'camilo@gmail.com',
      password: 'camilo123',
    };

    await auth(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
