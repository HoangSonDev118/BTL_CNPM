-- Create enum type for user roles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
        CREATE TYPE "Role" AS ENUM ('USER', 'STAFF', 'SUPER_ADMIN');
    END IF;
END $$;

-- Add role column to the User table with a default value
ALTER TABLE "User"
    ADD COLUMN IF NOT EXISTS "role" "Role" NOT NULL DEFAULT 'USER';

-- Ensure the column uses the Role enum type and default value
ALTER TABLE "User"
    ALTER COLUMN "role" TYPE "Role" USING "role"::"Role";

ALTER TABLE "User"
    ALTER COLUMN "role" SET DEFAULT 'USER';
