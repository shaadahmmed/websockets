import z from "zod";

export const listCommentarySchema = z.object({
    limit: z.coerce.number().int().positive().max(100).default(20),
    offset: z.coerce.number().int().min(0).default(0),
});

export type ListCommentary = z.infer<typeof listCommentarySchema>;

export const createCommentarySchema = z.object({
    minute: z.number().int().min(0),
    sequence: z.number().int().min(0),
    period: z.string().optional(),
    eventType: z.string().optional(),
    actor: z.string().optional(),
    team: z.string().optional(),
    message: z.string().min(1),
    metadata: z.record(z.string(), z.any()).optional(),
    tags: z.array(z.string()).optional(),
});

export type CreateCommentary = z.infer<typeof createCommentarySchema>;
