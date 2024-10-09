import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { PrismaClient } from "@prisma/client";

import type PrismaTypes from "@pothos/plugin-prisma/generated";

const prisma = new PrismaClient();

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "world",
    }),

    getPostsByUserId: t.prismaField({
      type: ["Post"],
      args: {
        userId: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        return prisma.post.findMany({
          ...query,
          where: {
            userId: args.userId,
          },
        });
      },
    }),
  }),
});

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
  }),
});

export const schema = builder.toSchema();
