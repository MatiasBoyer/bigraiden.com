import { Request } from "express";
import execute from "./executedb.service";
import { IGetUrl } from "interfaces/geturl.type";

async function get(req: Request): Promise<IGetUrl[]> {
  const result = await execute("routes/GetAllRoutes.sql");

  const status: IGetUrl[] = result.data;

  return status;
}

export default {
  get,
};
