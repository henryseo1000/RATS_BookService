import { mutation, query } from "./_generated/server";

export const getBooks = mutation({
  handler: async (ctx) => {
    return await ctx.db.query("book_info").collect();
  }
})