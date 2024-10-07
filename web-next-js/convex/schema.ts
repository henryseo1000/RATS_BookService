import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  admin_account: defineTable({ user_id: v.string() }),
  book_info: defineTable({
    author: v.string(),
    isbn: v.string(),
    publish_year: v.string(),
    reservation: v.optional(v.string()),
    title: v.string(),
    status: v.optional(v.string())
  }),
});