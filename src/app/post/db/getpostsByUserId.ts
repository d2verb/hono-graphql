import type { PrismaClient } from "@prisma/client";
import { ResultAsync } from "neverthrow";
import type { Post } from "../../../domain/post/entity";
import type { ObjectId } from "../../../domain/shared/objectid";

export const getPostsByUserId =
  (prisma: PrismaClient) =>
  (userId: string): ResultAsync<Post[], Error> =>
    ResultAsync.fromPromise(
      prisma.post.findMany({ where: { userId } }),
      (e) => e as Error,
    ).map((posts) =>
      posts.map((post) => ({
        ...post,
        id: post.id as ObjectId,
      })),
    );
