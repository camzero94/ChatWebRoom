-- Create "UserDB" table
CREATE TABLE "public"."UserDB" (
  "id" bigserial NOT NULL,
  "created_at" timestamptz NULL,
  "updated_at" timestamptz NULL,
  "deleted_at" timestamptz NULL,
  "email" text NULL,
  "password_hash" text NULL,
  PRIMARY KEY ("id")
);
-- Create index "UserDB_email_key" to table: "UserDB"
CREATE UNIQUE INDEX "UserDB_email_key" ON "public"."UserDB" ("email");
-- Create index "idx_UserDB_deleted_at" to table: "UserDB"
CREATE INDEX "idx_UserDB_deleted_at" ON "public"."UserDB" ("deleted_at");
