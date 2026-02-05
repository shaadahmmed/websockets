import { z } from "zod";

export const MATCH_STATUS = ["scheduled", "live", "finished"] as const;

export const listMatchQuerySchema = z.object({
    limit: z.coerce.number().int().positive().max(100).default(10).optional(),
    offset: z.coerce.number().int().nonnegative().default(0).optional(),
    sport: z.string().min(1).optional(),
    status: z.enum(MATCH_STATUS).optional(),
});

export type ListMatchQuery = z.infer<typeof listMatchQuerySchema>;

export const matchIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export type MatchIdParam = z.infer<typeof matchIdParamSchema>;

export const createMatchSchema = z
    .object({
        sport: z.string().min(1, "Sport is required"),
        homeTeam: z.string().min(1, "Home team is required"),
        awayTeam: z.string().min(1, "Away team is required"),
        startTime: z.coerce.date(),
        endTime: z.coerce.date(),
        homeScore: z.coerce.number().int().nonnegative().default(0),
        awayScore: z.coerce.number().int().nonnegative().default(0),
    })
    .superRefine(({ startTime, endTime }, ctx) => {
        if (new Date(startTime) >= new Date(endTime)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Start time must be before end time",
                path: ["startTime", "endTime"],
            });
        }
    })
    .transform((data) => {
        const { startTime, endTime } = data;
        let status: (typeof MATCH_STATUS)[number] = "live";
        const now = new Date();
        if (now < new Date(startTime)) {
            status = "scheduled";
        } else if (now >= new Date(endTime)) {
            status = "finished";
        }
        return { ...data, status };
    });

export type CreateMatchInput = z.infer<typeof createMatchSchema>;

export const updateScoreSchema = z.object({
    homeScore: z.coerce.number().int().nonnegative(),
    awayScore: z.coerce.number().int().nonnegative(),
});
