DO $$
BEGIN
    CREATE TYPE "Role" AS ENUM ('USER', 'STAFF', 'SUPER_ADMIN');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'User'
          AND column_name = 'role'
    ) THEN
        ALTER TABLE "User"
        ADD COLUMN "role" "Role" NOT NULL DEFAULT 'USER';
    ELSE
        UPDATE "User"
        SET "role" = COALESCE("role"::text, 'USER')::"Role"
        WHERE "role" IS NULL OR "role"::text NOT IN ('USER', 'STAFF', 'SUPER_ADMIN');

        ALTER TABLE "User"
        ALTER COLUMN "role" TYPE "Role" USING ("role"::text::"Role");

        ALTER TABLE "User"
        ALTER COLUMN "role" SET DEFAULT 'USER';

        UPDATE "User"
        SET "role" = 'USER'
        WHERE "role" IS NULL;

        ALTER TABLE "User"
        ALTER COLUMN "role" SET NOT NULL;
    END IF;
END $$;
