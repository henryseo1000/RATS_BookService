import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema ({
  book_info: defineTable({
    title: v.string(),
    author: v.string(),
    isbn: v.string() || v.number(),
    book_num: v.optional(v.int64()),
    publish_year: v.string()
  })
  .index("by_title", ["title"])
  .index("by_isbn_and_title", ["title", "isbn"]),

  user_info: defineTable({
    name: v.string(),
    student_id: v.int64(),
    user_id: v.string(),
    user_email: v.string()
  })
  .index("by_name", ["name"]),

  book_borrowed: defineTable({
    isbn: v.string(),
    user_id: v.string()
  })
  .index("by_isbn", ["isbn"]),

  book_returned: defineTable({
    isbn: v.string(),
    user_id: v.string()
  })
  .index("by_isbn", ["isbn"]),

  book_reserved: defineTable({
    isbn: v.string(),
    user_id: v.string()
  })
  .index("by_isbn", ["isbn"]),

  admin_account: defineTable({
    user_id: v.string()
  }),

  file_list: defineTable({
    user_id: v.string(),
    file_name: v.string(),
    file_size: v.int64()
  }),

  reserved_list: defineTable({
    user_id: v.string(),
    isbn: v.string()
  }),

  borrowed_list: defineTable({
    user_id: v.string(),
    isbn: v.string()
  })
});