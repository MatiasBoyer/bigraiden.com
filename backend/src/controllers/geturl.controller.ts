import { Request, Response, NextFunction } from "express";
import service from "../services/geturl.service";
import { IResponse } from "interfaces/iresponse.type";
import { IGetUrl } from "interfaces/geturl.type";

const cache_time = 15 * 60 * 1000;

let cache: {
  last_fetch: number;
  data: IGetUrl[] | undefined;
  pending?: Promise<IGetUrl[]>;
} = {
  last_fetch: 0,
  data: undefined,
};

async function get(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (cache.last_fetch + cache_time <= Date.now()) {
      if (!cache.pending) {
        cache.pending = service.get(req).then((data) => {
          cache.data = data;
          cache.last_fetch = Date.now();
          cache.pending = undefined;
          return data;
        });
      }

      await cache.pending;
    }

    if (!cache.data) {
      throw new Error("Failed to fetch data");
    }

    const result: IResponse<IGetUrl[]> = {
      success: true,
      data: cache.data,
    };
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export default {
  get,
};
