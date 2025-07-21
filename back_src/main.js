import express from "express";
import { createServer as createViteServer } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import router from "./api/api.js";

(async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const indexHtmlPath = path.resolve(__dirname, "..", "index.html");
  const rawHtml = await fs.readFile(indexHtmlPath, "utf-8");

  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // middlewares
  app.use(vite.middlewares);
  app.use("/api", router);

  // homepage
  app.get("/", async (req, res, next) => {
    try {
      const html = await vite.transformIndexHtml(req.url, rawHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
})();
