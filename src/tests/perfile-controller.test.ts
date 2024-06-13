import { Request, Response } from 'express';
import profileController from '../controllers/perfile-controller';

describe('Profile Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        user: 'camilo@gmail.com',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 200 and the user profile', () => {
    profileController(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Profile retrieved successfully',
      user: 'camilo@gmail.com',
    });
  });
});
