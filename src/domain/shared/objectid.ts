import { type Result, ok } from "neverthrow";
import { uuidv7 } from "uuidv7";
import type { newtype } from "./newtype";

export type ObjectId = newtype<"ObjectId", string>;

export function ObjectId(): Result<ObjectId, Error> {
  return ok(uuidv7() as ObjectId);
}
