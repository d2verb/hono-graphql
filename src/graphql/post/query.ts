import { getPostsByUserId } from "@/app/post/db/getPostsByUserId";
import { builder } from "@/graphql/builder";
import { PostRef } from "@/graphql/post/type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

builder.queryField("getPostsByUserId", (t) =>
  t.field({
    type: [PostRef],
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (_, { userId }) =>
      await getPostsByUserId(prisma)(userId).match(
        (posts) => posts,
        (e) => {
          throw e;
        },
      ),
  }),
);
