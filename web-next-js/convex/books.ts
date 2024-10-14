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
    const totalData = await ctx.db.query("book_history")
    .order("desc")
    .collect()
    .then((datas) => {
      const historyList = datas.map(() => {
        return {}
      })
    })

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
      borrowedList : userBorrowed
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

export const getUserBookmark = mutation({
  args: {
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const userBookmarks = await ctx.db.query("bookmark_list")
    .filter((q) => 
      q.eq(q.field("student_id"), args.student_id)
    )
    .order("desc")
    .collect();

    const totalBookmark = await userBookmarks.length;

    return {
      totalBookmark: totalBookmark,
      bookmarkList : userBookmarks
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
    }).then(() => 
      ctx.db.patch( args.book_id, { borrowed : args.student_id} )
    )
    .then(() => 
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
    }).then(() => 
      ctx.db.patch(args.book_id, { reservation : args.student_id })
    ).then(() => 
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
    const returnReq = await ctx.db.query("borrowed_list").filter((q) => {
      return q.eq(q.field("student_id"), args.student_id) && q.eq(q.field("book_id"), args.book_id)
    })
    .collect()
    .then((arr) => {
      const id = arr[0]._id
      ctx.db.delete(id).then(() => 
        ctx.db.patch(args.book_id, { borrowed : "" })
      ).then(() => 
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
    const cancelReq = await ctx.db.query("reserved_list").filter((q) => {
      return q.eq(q.field("student_id"), args.student_id) && q.eq(q.field("book_id"), args.book_id)
    })
    .collect()
    .then((arr) => {
      const id = arr[0]._id
      ctx.db.delete(id).then(() => 
        ctx.db.patch(args.book_id, { reservation : "" })
      ).then(() => 
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

export const addBookmark = mutation({
  args: {
    book_id: v.id("book_info"),
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const bookmarkReq = await ctx.db.insert("bookmark_list", {
      book_id : args.book_id,
      student_id : args.student_id
    }).then(() => {
      ctx.db.get(args.book_id).then((q) => {
        ctx.db.patch(args.book_id, {
          bookmark_count : q.bookmark_count + 1
        })
      })
    })

    return bookmarkReq;
  }
})

export const cancelBookmark = mutation({
  args: {
    book_id: v.id("book_info"),
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const bookmarkReq = await ctx.db.query("bookmark_list")
    .filter((q) => {
      return q.eq(q.field("book_id"), args.book_id) && q.eq(q.field("student_id"), args.student_id)
    })
    .collect()
    .then((q) => {
      if (q.length > 0) {
        ctx.db.delete(q[0]._id).then(() => {
          ctx.db.get(args.book_id).then((q) => {
            ctx.db.patch(args.book_id, {
              bookmark_count : q.bookmark_count <= 0 ? 0 : q.bookmark_count - 1
            })
          })
        })
      }
    })

    return bookmarkReq;
  }
})