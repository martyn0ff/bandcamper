import hash from "hash.js";

export const sha256 = (input: string) =>
  hash.sha256().update(input).digest("hex");
