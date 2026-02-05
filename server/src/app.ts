import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import http from "http";
import commentaryRouter from "./commentary/commentary.route";
import { securityMiddleware } from "./config/arcjet";
import matchRouter from "./matches/matches.route";
import { attachWsServer } from "./ws/ws-server";

const app: Express = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(securityMiddleware);

app.get("/", (_req, res) => {
    res.send("Hello, World!");
});

app.use("/api/matches", matchRouter);
app.use("/api/matches/:id/commentary", commentaryRouter);

const { broadcastMatchCreated } = attachWsServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

export default server;
