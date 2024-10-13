import type { ObjectId } from "@/domain/shared/objectid";

export interface Post {
  id: ObjectId;
  title: string;
  content: string;
}
