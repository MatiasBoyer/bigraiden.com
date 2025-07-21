import { Router } from "express";
import db from "./db.js";

const router = Router();

let cache = {
  data: {},
  timestamp: 0,
  next_fetch: 0,
  countdown: 0,
};

let cache_time = 60 * 15;

router.get("/get_routes", async (req, res) => {
  const pool = await db.GetPool();
  if (!pool) {
    res.status(500).send({ message: ["no pool recvd"] });
    return;
  }

  const conn = await db.GetConnection(pool);
  if (!conn) {
    res.status(500).send({ message: ["no conn recvd"] });
    return;
  }

  const unix_time = new Date().getTime() / 1000;
  cache.countdown = cache.next_fetch - unix_time;
  if (unix_time >= cache.next_fetch) {
    cache.data = await db.ExecQuery(
      conn,
      "SELECT label, iconsvg, url FROM routes WHERE enabled = 1"
    );
    cache.timestamp = unix_time;
    cache.next_fetch = unix_time + cache_time;
  }

  await db.DropConnection(conn);
  res.status(200).send(cache);
});

export default router;
