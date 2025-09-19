import { Request, Response, NextFunction } from "express";
import service from "../services/geturl.service";
import { IResponse } from "interfaces/iresponse.type";
import { IGetUrl } from "interfaces/geturl.type";

async function get(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result: IResponse<IGetUrl[]> = {
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
