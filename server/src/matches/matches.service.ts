import db from "@/db/db";
import { MatchTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { CreateMatchInput, ListMatchQuery } from "./matches.validate";

export async function createMatch(match: CreateMatchInput) {
    const [event] = await db.insert(MatchTable).values(match).returning();
    return event;
}

export async function getMatches(query: ListMatchQuery) {
    const matches = await db
        .select()
        .from(MatchTable)
        .where(
            and(
                query.sport ? eq(MatchTable.sport, query.sport) : undefined,
                query.status ? eq(MatchTable.status, query.status) : undefined,
            ),
        )
        .orderBy(desc(MatchTable.createdAt))
        .limit(query.limit ?? 20)
        .offset(query.offset ?? 0);
    return matches;
}
