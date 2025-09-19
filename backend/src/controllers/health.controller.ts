import { Request, Response, NextFunction } from "express";
import service from "../services/health.service";
import { IHealth } from "interfaces/health.type";
import { IResponse } from "interfaces/iresponse.type";

async function get(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result: IResponse<IHealth> = {
      success: true,
      data: await service.get(req),
    };
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export default {
  get,
};
