import SchemaBuilder from "@pothos/core";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";

// TODO: add scope auth plugin
export const builder = new SchemaBuilder({
  plugins: [SimpleObjectsPlugin],
});

builder.queryType({});
builder.mutationType({});
