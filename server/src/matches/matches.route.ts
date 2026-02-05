import { Router } from "express";
import {
    createMatchController,
    getMatchesController,
} from "./matches.controller";

const matchRouter: Router = Router();

matchRouter.post("/", createMatchController);
matchRouter.get("/", getMatchesController);

export default matchRouter;
