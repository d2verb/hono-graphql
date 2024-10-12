import { createYoga } from "graphql-yoga";
import { Hono } from "hono";
import "./graphql";
import { builder } from "./graphql/builder";
const app = new Hono();

const yoga = createYoga({
  graphqlEndpoint: "/",
  schema: builder.toSchema({}),
});

app.mount("/graphql", yoga);

export default app;
