import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  book_info: defineTable({
    author: v.string(),
    isbn: v.string(),
    publish_year: v.string(),
    reservation: v.optional(v.string()),
    borrowed: v.optional(v.string()),
    title: v.string(),
    status: v.optional(v.string()),
    type: v.optional(v.string()),
    bookmark_count: v.optional(v.number())
  }),
  file_list: defineTable({
    author: v.string(),
    file_name: v.string(),
    file_size: v.number(),
    description: v.string(),
    storageId: v.id("_storage"),
    format: v.string()
  }),
  user_info: defineTable({
    user_id: v.string(),
    real_name: v.string(),
    student_id: v.string(),
    major: v.string(),
    grade: v.string(),
    user_email: v.string(),
    username: v.string()
  }),
  book_history: defineTable({
    student_id: v.string(),
    type: v.string(),
    book_id: v.id("book_info")
  }),
  borrowed_list: defineTable({
    student_id: v.string(),
    book_id: v.id("book_info"),
    extended: v.boolean()
  }),
  reserved_list: defineTable({
    student_id: v.string(),
    book_id: v.id("book_info")
  }),
  event_list: defineTable({
    title: v.string(),
    description: v.string(),
    student_id: v.string(),
    type: v.string(),
    due_date: v.optional(v.float64()),
    relative: v.optional(v.id("event_list")),
    book_info: v.optional(v.id("book_info"))
  }),
  bookmark_list: defineTable({
    book_id: v.id("book_info"),
    student_id: v.string()
  }),
});