import { createPostByUserId } from "@/app/post/db/createPostByUserId";
import { builder } from "@/graphql/builder";
import { PostRef } from "@/graphql/post/type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PostInput = builder.inputType("PostInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
});

builder.mutationField("createPost", (t) =>
  t.field({
    type: PostRef,
    args: {
      userId: t.arg.string({ required: true }),
      input: t.arg({ type: PostInput, required: true }),
    },
    resolve: async (_, { userId, input }) =>
      await createPostByUserId(prisma)(
        userId,
        input.title,
        input.content,
      ).match(
        (posts) => posts,
        (e) => {
          throw e;
        },
      ),
  }),
);
