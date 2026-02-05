import { pgTable } from "drizzle-orm/pg-core";
import { MatchTable } from "./match";

export const CommentaryTable = pgTable("commentary", (t) => ({
    id: t.uuid().primaryKey().defaultRandom(),
    matchId: t
        .uuid()
        .notNull()
        .references(() => MatchTable.id, { onDelete: "cascade" }),
    minute: t.integer(),
    sequence: t.integer(),
    period: t.text(),
    eventType: t.text(),
    actor: t.text(),
    team: t.text(),
    message: t.text(),
    metadata: t.jsonb(),
    tags: t.text().array(),
    createdAt: t.timestamp().defaultNow().notNull(),
    updatedAt: t.timestamp().defaultNow().notNull(),
}));
