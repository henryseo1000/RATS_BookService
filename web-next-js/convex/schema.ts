import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  admin_account: defineTable({ user_id: v.string() }),
  book_info: defineTable({
    author: v.string(),
    isbn: v.string(),
    publish_year: v.string(),
    reservation: v.optional(v.string()),
    borrowed: v.optional(v.string()),
    title: v.string(),
    status: v.optional(v.string()),
    type: v.optional(v.string()),
    bookmark_count: v.number()
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
    user_name: v.string(),
    real_name: v.string(),
    student_id: v.string(),
    major: v.string(),
    grade: v.string(),
    email: v.string()
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
    due: v.number(),
    description: v.string(),
    thumbnail: v.string()
  }),
  event_history: defineTable({
    event_id: v.string(),
    isbn: v.string(),
    descrption: v.optional(v.string())
  }),
  recommand_books: defineTable({
    title: v.string(),
    descrption: v.string(),
    imageUrl: v.string(),
    webUrl: v.optional(v.string()),
    isbn: v.string()
  }),
  bookmark_list: defineTable({
    book_id: v.id("book_info"),
    student_id: v.string()
  }),
});