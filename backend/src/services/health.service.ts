import { Request } from "express";
import execute from "./executedb.service";
import { IResponse } from "interfaces/iresponse.type";
import { IHealth } from "interfaces/health.type";

async function get(req: Request): Promise<IHealth> {
  const result = await execute("health/GetDBHealth.sql");

  const status: IHealth = {
    server: {
      uptime: process.uptime(),
      timestamp: Date.now(),
    },
    database: result.status == 200 ? result.data[0] : "failure",
  };

  return status;
}

export default {
  get,
};
