import { destroySessionResponse } from "@/lib/auth";

export async function POST() {
  return destroySessionResponse();
}
