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
    const bookInfo = await ctx.db.get(args.book_id)

    return bookInfo;
  }
})

export const getUserHistory = mutation({
  handler: async (ctx) => {
    const totalData = await ctx.db.query("book_history").order("desc").take(10);
    const totalLength = await totalData.length;

    return {
      totalCount : totalLength,
      historyList : totalData
    }
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
    .collect();

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

    const totalReserved = await userReserved.length;

    return {
      totalReserved: totalReserved,
      reservedList : userReserved
    };
  }
})

export const borrowBook = mutation({
  args: {
    book_id: v.id("book_info"), 
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const getBorrowedList = await ctx.db.insert("borrowed_list", {
      book_id: args.book_id,
      student_id: args.student_id
    }).then((q) => 
      ctx.db.patch( args.book_id, { borrowed : args.student_id} )
    )
    .then((q) => 
      ctx.db.insert( "book_history", { 
        book_id : args.book_id,
        student_id : args.student_id,
        type: "대출"
      } )
    )

    return getBorrowedList;
  }
})

export const reserveBook = mutation({
  args: {
    book_id: v.id("book_info"),
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const getReservedList = await ctx.db.insert("reserved_list", {
      book_id: args.book_id,
      student_id: args.student_id
    }).then((q) => 
      ctx.db.patch(args.book_id, { reservation : args.student_id })
    ).then((q) => 
      ctx.db.insert("book_history", { 
        book_id : args.book_id,
        student_id : args.student_id,
        type: "예약"
      })
    )

    return getReservedList;
  }
})

export const returnBook = mutation({
  args: {
    book_id: v.id("book_info"),
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const returnReq = ctx.db.query("borrowed_list").filter((q) => {
      return q.eq(q.field("student_id"), args.student_id) && q.eq(q.field("book_id"), args.book_id)
    })
    .collect()
    .then((arr) => {
      const id = arr[0]._id
      ctx.db.delete(id).then((q) => 
        ctx.db.patch(args.book_id, { borrowed : "" })
      ).then((q) => 
        ctx.db.insert("book_history", { 
          book_id : args.book_id,
          student_id : args.student_id,
          type: "반납"
        })
      )
    })

    return returnReq;
  }
})

export const cancelReservation = mutation({
  args: {
    book_id: v.id("book_info"),
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const cancelReq = ctx.db.query("reserved_list").filter((q) => {
      return q.eq(q.field("student_id"), args.student_id) && q.eq(q.field("book_id"), args.book_id)
    })
    .collect()
    .then((arr) => {
      const id = arr[0]._id
      ctx.db.delete(id).then((q) => 
        ctx.db.patch(args.book_id, { reservation : "" })
      ).then((q) => 
        ctx.db.insert("book_history", { 
          book_id : args.book_id,
          student_id : args.student_id,
          type: "예약"
        })
      )
    })

    return cancelReq;
  }
})