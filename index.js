import express from "express";
import http from "http";

export const foo = 10;

const setupServer = (app, port) => {
  app.set("port", port);
  const server = http.createServer(app);
  server.listen(port);
  return { server };
};

export const testServer = async (port) => {
  const app = express();

  app.get("/error", (req, res) => {
    throw Error("error");
  });

  app.get("/ok", (req, res) => {
    res.send("ok");
  });

  // error handling middleware
  app.use((err, req, res, next) => {
    if (err) {
      next(res.status(500).send("error"));
    } else {
      next();
    }
  });

  return setupServer(app, port);
};
