import express from "express";
import { createServer as createViteServer } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

(async () => {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.get("/api/hello", (req, res) => {
    res.send("Hello!");
  });

  app.use(/.*/, async (req, res, next) => {
    try {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const indexHtmlPath = path.resolve(__dirname, "..", "index.html");

      let html = await vite.transformIndexHtml(req.url, indexHtmlPath);
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
