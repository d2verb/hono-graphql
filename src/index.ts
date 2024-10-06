import { createYoga } from "graphql-yoga";
import { Hono } from "hono";
import { schema } from "./schema";
const app = new Hono();

const yoga = createYoga({
  graphqlEndpoint: "/",
  schema,
});

app.mount("/graphql", yoga);

export default app;
