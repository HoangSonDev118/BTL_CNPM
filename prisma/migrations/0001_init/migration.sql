-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Enable RLS and restrict access so users can only touch their own row
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;

CREATE POLICY "User select - owner only" ON "User"
    FOR SELECT
    TO authenticated
    USING (auth.uid()::text = "id");

CREATE POLICY "User insert - owner only" ON "User"
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid()::text = "id");

CREATE POLICY "User update - owner only" ON "User"
    FOR UPDATE
    TO authenticated
    USING (auth.uid()::text = "id")
    WITH CHECK (auth.uid()::text = "id");

CREATE POLICY "User delete - owner only" ON "User"
    FOR DELETE
    TO authenticated
    USING (auth.uid()::text = "id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
