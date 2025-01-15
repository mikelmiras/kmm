CREATE TABLE "sessions" (
	"uuid4" uuid DEFAULT gen_random_uuid(),
	"userid" integer,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userid_users_id_fk" FOREIGN KEY ("userid") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;