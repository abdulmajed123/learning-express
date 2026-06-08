import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: false, // In Production =>True
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(201).json({
      success: true,
      message: "Profile Create Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  // console.log(req.cookies);
  try {
    const result = await authService.generateFreshToken(
      req.cookies.refreshToken,
    );
    res.status(200).json({
      success: true,
      message: "Access Token Generated!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const authController = { loginUser, refreshToken };
