import { handleError } from "@/helper/handle-error";
import { parseSchema } from "@/helper/parse-schema";
import { Request, Response } from "express";
import { createCommentary, getComments } from "./commentary.service";
import {
    createCommentarySchema,
    listCommentarySchema,
} from "./commentary.validate";

export async function createCommentaryController(req: Request, res: Response) {
    const comment = parseSchema(createCommentarySchema, req.body, res);
    if (!comment) return;

    const matchId = req.params.id as string;
    try {
        const data = await createCommentary(matchId, comment);
        res.status(201).json({ data });
    } catch (error) {
        handleError(res, error);
    }
}

export async function getCommentaryController(req: Request, res: Response) {
    const query = parseSchema(listCommentarySchema, req.query, res);
    if (!query) return;

    const matchId = req.params.id as string;
    try {
        const comments = await getComments(matchId, query);
        res.status(200).json(comments);
    } catch (error) {
        handleError(res, error);
    }
}
