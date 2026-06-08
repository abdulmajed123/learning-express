import type { Request, Response } from "express";
import { userService } from "./user.service.js";
import sendResponse from "../../utility/sendResponse.js";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  // const { name, email, password, age } = req.body;
  try {
    const result = await userService.createUserIntoDB(req.body);
    // console.log(result);
    // res.status(201).json({
    //   success: true,
    //   message: "User Created Successfully",
    //   data: result.rows[0],
    // });
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  console.log(req.user);
  try {
    const result = await userService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users Retrived Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUserFromDB(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Users Not Found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "Users Retrived Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const UpdateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.updateUserIntoDB(req.body, id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Users Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users Update Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Users Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users Deleted Successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  UpdateUser,
  deleteUser,
};
