
import { db, send, method, userFromRequest } from "../_lib.js";

export default async function handler(req, res) {
  if (!method(req, res, "GET")) return;

  const user = await userFromRequest(req);
  if (!user) {
    return send(res, 401, { error: "unauthorized" });
  }

  const { data, error } = await db
    .from("lessons")
    .select("id,title,description,sort_order")
    .eq("active", true)
    .order("sort_order");

  if (error) {
    return send(res, 500, { error: "database_error" });
  }

  return send(res, 200, { lessons: data });
}
