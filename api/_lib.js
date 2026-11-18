
import { createClient } from "@supabase/supabase-js";

export const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

export function send(res, status, body) {
  return res.status(status).json(body);
}

export function method(req, res, allowed = "POST") {
  if (req.method !== allowed) {
    send(res, 405, { error: "method_not_allowed" });
    return false;
  }
  return true;
}

export async function userFromRequest(req) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";

  if (!token) return null;

  const client = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );

  const { data, error } = await client.auth.getUser(token);
  return error ? null : data.user;
}

export function validLevel(v) {
  return ["easy", "medium", "hard"].includes(v);
}

export function safeInt(v, min, max) {
  const n = Number(v);
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
}
