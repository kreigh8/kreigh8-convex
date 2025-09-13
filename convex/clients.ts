import { v } from 'convex/values'
import { query, mutation, internalAction } from './_generated/server'
import { api } from './_generated/api'

export const addClient = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    image: v.object({
      storageId: v.id('_storage'),
      author: v.string(),
      format: v.string()
    }),
    active: v.boolean()
  },
  handler: async (ctx, args) => {
    // Insert image into images table
    const imageId = await ctx.db.insert('images', {
      body: args.image.storageId,
      author: args.image.author,
      format: args.image.format
    })

    // Insert client into clients table
    const clientId = await ctx.db.insert('clients', {
      name: args.name,
      url: args.url,
      imageId,
      active: args.active
    })

    console.log('Added new client with id:', clientId)
    return clientId
  }
})

export const listClients = query({
  // Validators for arguments.
  args: {
    count: v.optional(v.number())
  },

  // Query implementation.
  handler: async (ctx, args) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const clients = await ctx.db
      .query('clients')
      // Ordered by _creationTime, return most recent
      .order('desc')
      .collect()

    return Promise.all(
      clients.map(async (client) => {
        // Fetch image URL from images table
        const image = await ctx.db.get(client.imageId)
        let imageUrl = null
        if (image && image.body) {
          imageUrl = await ctx.storage.getUrl(image.body)
          console.log('imageUrl', imageUrl)
        }
        return {
          ...client,
          imageUrl
        }
      })
    )
  }
})
