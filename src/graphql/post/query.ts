import { PrismaClient } from "@prisma/client";
import { getPostsByUserId } from "../../app/post/db/getpostsByUserId";
import { builder } from "../builder";
import { PostRef } from "./type";

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
