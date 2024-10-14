import type { Post } from "@/domain/post/entity";
import type { ObjectId } from "@/domain/shared/objectid";
import type { PrismaClient } from "@prisma/client";
import { ResultAsync } from "neverthrow";

export type createPostByUserId = (
  userId: string,
  title: string,
  content: string,
) => ResultAsync<Post, Error>;

export const createPostByUserId =
  (prisma: PrismaClient): createPostByUserId =>
  (userId, title, content) =>
    ResultAsync.fromPromise(
      prisma.post.create({
        data: {
          userId,
          title,
          content,
        },
      }),
      (e) => e as Error,
    ).map((post) => ({
      ...post,
      id: post.id as ObjectId,
    }));
