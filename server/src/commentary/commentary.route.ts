import { Router } from "express";
import {
    createCommentaryController,
    getCommentaryController,
} from "./commentary.controller";

const commentaryRouter: Router = Router({ mergeParams: true });

commentaryRouter.post("/", createCommentaryController);
commentaryRouter.get("/", getCommentaryController);

export default commentaryRouter;
