-- Allow the Postgres service role used by the Next.js backend to work with the User table
DROP POLICY IF EXISTS "User full access for postgres" ON "User";

CREATE POLICY "User full access for postgres" ON "User"
    FOR ALL
    TO postgres
    USING (true)
    WITH CHECK (true);
