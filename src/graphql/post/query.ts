import { PrismaClient } from "@prisma/client";
import type { ObjectId } from "../../domain/shared/objectid";
import { builder } from "../builder";
import { PostRef } from "./type";

const prisma = new PrismaClient();

builder.queryField("getPostsByUserId", (t) =>
  t.field({
    type: [PostRef],
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (_, { userId }) => {
      return (
        await prisma.post.findMany({
          where: {
            userId: userId,
          },
        })
      ).map((post) => ({
        ...post,
        id: post.id as ObjectId,
      }));
    },
  }),
);
