import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number()
  }),
  clients: defineTable({
    name: v.string(),
    url: v.string(),
    imageId: v.id('images'),
    active: v.boolean()
  }),
  messages: defineTable({
    author: v.string(),
    storageId: v.id('_storage')
  }),
  images: defineTable({
    body: v.id('_storage'),
    author: v.string(),
    format: v.string()
  })
})
