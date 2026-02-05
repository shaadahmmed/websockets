import { pgEnum, pgTable } from "drizzle-orm/pg-core";

export const MatchStatusEnum = pgEnum("match_status", [
    "scheduled",
    "live",
    "finished",
]);

export const MatchTable = pgTable("matches", (t) => ({
    id: t.uuid().primaryKey().defaultRandom(),
    homeTeam: t.varchar({ length: 255 }).notNull(),
    awayTeam: t.varchar({ length: 255 }).notNull(),
    sport: t.varchar({ length: 255 }).notNull(),
    startTime: t.timestamp().notNull(),
    endTime: t.timestamp().notNull(),
    status: MatchStatusEnum().default("scheduled").notNull(),
    homeScore: t.integer().default(0).notNull(),
    awayScore: t.integer().default(0).notNull(),
    createdAt: t.timestamp().defaultNow().notNull(),
    updatedAt: t.timestamp().defaultNow().notNull(),
}));
