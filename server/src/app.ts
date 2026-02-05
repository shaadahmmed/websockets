import "dotenv/config";
import express, { Express } from "express";

const app: Express = express();

app.get("/", (_req, res) => {
    res.send("Hello, World!");
});

export default app;
