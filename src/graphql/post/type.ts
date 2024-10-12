import type { Post } from "../../domain/post/entity";
import { builder } from "../builder";

export const PostRef = builder.objectRef<Post>("Post");

PostRef.implement({
  description: "A blog post",
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
  }),
});
