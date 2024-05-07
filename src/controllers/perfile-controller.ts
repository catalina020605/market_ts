import { Request, Response } from "express";

const profileController = (req: Request, res: Response) => {
  const user = req.body.user; 
  return res.status(200).json({ message: "Profile retrieved successfully", user });
};

export default profileController;
