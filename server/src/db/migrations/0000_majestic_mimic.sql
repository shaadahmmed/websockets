CREATE TYPE "public"."match_status" AS ENUM('scheduled', 'live', 'finished');--> statement-breakpoint
CREATE TABLE "commentary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"matchId" uuid NOT NULL,
	"minute" integer,
	"sequence" integer,
	"period" text,
	"eventType" text,
	"actor" text,
	"team" text,
	"message" text,
	"metadata" jsonb,
	"tags" text[],
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"homeTeam" varchar(255) NOT NULL,
	"awayTeam" varchar(255) NOT NULL,
	"sport" varchar(255) NOT NULL,
	"startTime" date NOT NULL,
	"status" "match_status" DEFAULT 'scheduled' NOT NULL,
	"homeScore" integer DEFAULT 0 NOT NULL,
	"awayScore" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "commentary" ADD CONSTRAINT "commentary_matchId_matches_id_fk" FOREIGN KEY ("matchId") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE no action;