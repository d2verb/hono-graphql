import { builder } from "@/graphql/builder";

const AuthPayload = builder.simpleObject("AuthPayload", {
  fields: (t) => ({
    token: t.string(),
  }),
});

builder.mutationField("socialLogin", (t) =>
  t.field({
    type: AuthPayload,
    args: {
      provider: t.arg.string({ required: true }),
      idToken: t.arg.string({ required: true }),
    },
    resolve: async (_, { provider, idToken }) => {
      return { token: "" };
    },
  }),
);
