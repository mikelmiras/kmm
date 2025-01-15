ALTER TABLE "sessions" ADD PRIMARY KEY ("uuid4");--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "uuid4" SET NOT NULL;