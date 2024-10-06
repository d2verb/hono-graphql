import SchemaBuilder from "@pothos/core";

const builder = new SchemaBuilder({});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "world",
    }),

    getPostsByUserId: t.field({
      type: [Post],
      args: {
        userId: t.arg.string(),
      },
      resolve: async (_, { userId }) => {
        return [
          {
            id: "1",
            title: "test",
            content: "test",
          },
        ];
      },
    }),
  }),
});

interface Post {
  id: string;
  title: string;
  content: string;
}

const Post = builder.objectRef<Post>("Post");

Post.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
  }),
});

export const schema = builder.toSchema();
