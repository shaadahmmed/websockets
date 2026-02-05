import { handleError } from "@/helper/handle-error";
import { parseSchema } from "@/helper/parse-schema";
import { Request, Response } from "express";
import { createMatch, getMatches } from "./matches.service";
import { createMatchSchema, listMatchQuerySchema } from "./matches.validate";

export async function createMatchController(req: Request, res: Response) {
    const data = parseSchema(createMatchSchema, req.body, res);
    if (!data) return;
    try {
        res.status(201).json({ event: await createMatch(data) });
    } catch (error) {
        handleError(res, error);
    }
}

export async function getMatchesController(req: Request, res: Response) {
    const query = parseSchema(listMatchQuerySchema, req.query, res);
    if (!query) return;
    try {
        res.status(200).json(await getMatches(query));
    } catch (error) {
        handleError(res, error);
    }
}
