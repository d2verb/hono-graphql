import type { ObjectId } from "../shared/objectid";

export interface Post {
  id: ObjectId;
  title: string;
  content: string;
}
