import type { Request, Response } from "express";
import { pool } from "../../db/index.js";
import { userService } from "./user.service.js";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  // const { name, email, password, age } = req.body;
  try {
    const result = await userService.createUserIntoDB(req.body);
    // console.log(result);
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

export const userController = { createUser };
