import { Request } from "express";
import execute from "./executedb.service";

async function get(req: Request): Promise<any> {
  //const result = await execute("health/GetDBHealth.sql");

  const status: any = {
    text: "hello world!",
  };

  return status;
}

export default {
  get,
};
