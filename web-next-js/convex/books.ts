import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const getBooks = mutation({
  handler: async (ctx) => {
    const totalData = await ctx.db.query("book_info").order("desc").collect()
    const totalLength = await totalData.length;

    return {
      totalCount : totalLength,
      bookList : totalData
    }
  }
})

export const getBookHistory = mutation({
  handler: async (ctx) => {
    const totalData = await ctx.db.query("book_history").order("desc").collect()

    return totalData;
  }
})

export const getBookInfo = mutation({
  args: {
    book_id : v.id("book_info")
  },
  handler: async (ctx, args) => {
    const bookInfo = await ctx.db.query("book_info")
    .filter((q) => 
      q.eq(q.field("_id"), args.book_id)
    )
    .order("desc")
    .collect()[0]!;

    return bookInfo;
  }
})

export const getUserHistory = mutation({
  handler: async (ctx) => {

  }
})

export const getUserBorrowed = mutation({
  args: {
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    let booklist = [];
    const userBorrowed = await ctx.db.query("borrowed_list")
    .filter((q) => 
      q.eq(q.field("student_id"), args.student_id)
    )
    .order("desc")
    .collect()

    await userBorrowed.map(async (item) => {
      const book = await ctx.db.query("book_info")
        .filter((q) => 
          q.eq(q.field("_id"), item?.book_id)
        )
        .collect();
        
        booklist.push(await book[0]);
    })

    const totalBorrowed = await userBorrowed.length;

    return {
      totalBorrowed : totalBorrowed,
      borrowedList : booklist
    };
  }
})

export const getUserReserved = mutation({
  args: {
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const userReserved = await ctx.db.query("reserved_list")
    .filter((q) => 
      q.eq(q.field("student_id"), args.student_id)
    )
    .order("desc")
    .collect();

    const totalBorrowed = await userReserved.length;

    return {
      totalBorrowed: totalBorrowed,
      borrowedList : userReserved
    };
  }
})

export const borrowBook = mutation({
  args: {
    book_id: v.id("book_info"), 
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const book = await ctx.db.insert("borrowed_list", {
      book_id: args.book_id,
      student_id: args.student_id
    });

    return book;
  }
})