import db from "@/db/db";
import { CommentaryTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { CreateCommentary, ListCommentary } from "./commentary.validate";

export async function createCommentary(
    matchId: string,
    commentary: CreateCommentary,
) {
    const [event] = await db
        .insert(CommentaryTable)
        .values({ matchId, ...commentary })
        .returning();
    return event;
}

export async function getComments(matchId: string, query: ListCommentary) {
    const { limit, offset } = query;

    const events = await db
        .select()
        .from(CommentaryTable)
        .where(eq(CommentaryTable.matchId, matchId))
        .orderBy(desc(CommentaryTable.createdAt))
        .limit(limit)
        .offset(offset);
    return events;
}
