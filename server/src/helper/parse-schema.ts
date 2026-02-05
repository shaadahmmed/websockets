import { Response } from "express";
import { ZodType } from "zod";

export function parseSchema<T>(
    schema: ZodType<T>,
    data: unknown,
    res: Response,
): T | null {
    const parsed = schema.safeParse(data);
    if (parsed.success) {
        return parsed.data;
    }
    res.status(400).json({ error: parsed.error.issues });
    return null;
}
