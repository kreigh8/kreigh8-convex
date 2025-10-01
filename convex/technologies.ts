import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createTechnology = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    image: v.object({
      storageId: v.id('_storage'),
      author: v.string(),
      format: v.string()
    })
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }

    // Insert image into images table
    const imageId = await ctx.db.insert('images', {
      body: args.image.storageId,
      author: args.image.author,
      format: args.image.format
    })

    // Insert client into clients table
    const technologyId = await ctx.db.insert('technologies', {
      name: args.name,
      url: args.url,
      imageId
    })

    console.log('Added new technology with id:', technologyId)
    return technologyId
  }
})

export const listTechnologies = query({
  // Validators for arguments.
  args: {
    count: v.optional(v.number())
  },

  // Query implementation.
  handler: async (ctx, args) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const technologies = await ctx.db
      .query('technologies')
      // Ordered by _creationTime, return most recent
      .order('desc')
      .collect()

    return Promise.all(
      technologies.map(async (technology) => {
        // Fetch image URL from images table
        const image = await ctx.db.get(technology.imageId)
        let imageUrl = null
        if (image && image.body) {
          imageUrl = await ctx.storage.getUrl(image.body)
          console.log('imageUrl', imageUrl)
        }
        return {
          ...technology,
          imageUrl
        }
      })
    )
  }
})
