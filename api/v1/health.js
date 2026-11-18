
import { send, method } from "../_lib.js";

export default async function handler(req, res) {
  if (!method(req, res, "GET")) return;
  return send(res, 200, {
    ok: true,
    service: "arabic8-api",
    version: "1.0.0"
  });
}
