import { v } from "convex/values";
import { query, mutation, internalAction } from "./_generated/server";
import { api } from "./_generated/api";

export const addClient = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    imageId: v.id("_storage")
  },
  handler: async (ctx, args) => {
    //// Insert or modify documents in the database here.
    //// Mutations can also read from the database like queries.
    //// See https://docs.convex.dev/database/writing-data.


    // const imageId = await ctx.db.get(args.imageId);

    // const id = await ctx.db.insert("clients", {
    //   name: args.name,
    //   url: args.url,
    //   imageId: imageId?.storageId
    // });

    

    console.log("Added new client with id:", args);
    // Optionally, return a value from your mutation.
    // return id;
  },
})

export const listClients = query({
  // Validators for arguments.
  args: {
    count: v.optional(v.number()),
  },

  // Query implementation.
  handler: async (ctx, args) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const clients = await ctx.db
      .query("clients")
      // Ordered by _creationTime, return most recent
      .order("desc")
      .take(args.count ?? 1000000);
    return Promise.all(
      clients.map(async (client) => ({
        ...client,
        // If the message is an "image" its `body` is an `Id<"_storage">`
        ...(client.format === "image"
          ? { url: await ctx.storage.getUrl(client.body) }
          : {}),
      })),
    );
  },
});

export const sendImage = mutation({
  args: { storageId: v.id("_storage"), author: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("clients", {
      body: args.storageId,
      author: args.author,
      format: "image",
    });
  },
});
