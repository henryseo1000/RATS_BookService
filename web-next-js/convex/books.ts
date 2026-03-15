import { action, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getBooks = mutation({
  handler: async (ctx) => {
    const totalData = await ctx.db.query("book_info").order("desc").collect()
    const totalLength = totalData.length;
    const totalPages = totalLength % 10 == 0 ? totalLength / 10 : totalLength / 10 + 1;

    return {
      totalCount : totalLength,
      bookList : totalData,
      totalPageNum : totalPages
    }
  }
})

export const getBookListByFliter = mutation({
  args : {
    input: v.string(),
    searchType: v.string(),
    borrowedFilter: v.string(),
    reservedFilter: v.string(),
    pageNum: v.number()
  },
  handler: async (ctx, args) => {
    let totalLength = 0;
    let totalPages = 0;
    const filteredList = await ctx.db.query("book_info").order("desc").collect()
        .then((booklist) => {
            const searchResult = booklist.filter((item) => {
                return item?.title?.replace(" ", "").toLowerCase().includes(args.input.toLowerCase())
                    || item?.isbn?.replace(" ", "").toLowerCase().includes(args.input.toLowerCase())
                ;
            }).filter((item) => {
                if (args.searchType === "전체") {
                    return true;
                }
                else {
                    return item?.type?.includes(args.searchType);
                }
            }).filter((item) => {
                if (args.borrowedFilter === "전체") {
                    return true;
                }
                else {
                    return item.status?.includes(args.borrowedFilter);
                }
            }).filter((item) => {
                if (args.reservedFilter === "all") {
                    return true;
                }
                else if (args.reservedFilter === "reserved") {
                    return item.reservation && item.reservation !== "";
                }
                else {
                    return !item.reservation || item.reservation === "";
                }
            })

            totalLength = searchResult.length;
            totalPages = (totalLength % 10 == 0) && totalLength != 0 ? Math.floor(totalLength) / 10 : Math.floor(totalLength / 10) + 1;

            return searchResult;
        }).then((result) => {
            if(result.length == 0) {
              return [];
            }

            if (args.pageNum < totalPages) {
              return result.splice((args.pageNum - 1) * 10, 10);
            }
            else if (args.pageNum == totalPages) {
              return result.splice((args.pageNum - 1) * 10, totalLength % 10);
            }
            else {
              throw new Error("Page number is bigger than total pages. Please try again.");
            }
        })

        return {
          filteredList: filteredList,
          totalLength: totalLength,
          totalPages : totalPages
        };
    }
})

export const recommandList = mutation({
  handler: async (ctx) => {
    const totalData = await ctx.db.query("recommand_books").order("desc").collect();
    const totalLength = totalData.length;

    return {
      totalCount: totalLength,
      bookList: totalData
    }
  }
})

export const getBookHistory = mutation({
  handler: async (ctx) => {
    const totalData = await ctx.db.query("book_history")
    .order("desc")
    .collect()
    .then(async (data) => {
      const historyResult = [];
      for(let i = 0; i < data.length; i++) {
        const book_data = await ctx.db.get(data[i].book_id);
        historyResult.push({
          ...data[i],
          book_title : book_data.title,
          book_isbn : book_data.isbn
        })
      }
      return historyResult;
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
    const totalData = await ctx.db.query("book_history")
      .order("desc")
      .collect()
      .then(async (data) => {
      const historyResult = [];
      for(let i = 0; i < data.length; i++) {
        const book_data = await ctx.db.get(data[i].book_id);
        historyResult.push({
          ...data[i],
          book_title : book_data.title,
          book_isbn : book_data.isbn
        })
      }
      return historyResult;
    })

    const totalLength = totalData.length;

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
    const userBorrowed = await ctx.db.query("borrowed_list")
    .filter((q) => 
      q.eq(q.field("student_id"), args.student_id)
    )
    .collect()
    .then(async (data) => {
      const borrowedResult = [];
      for (let i = 0; i < data.length; i++) {
        await ctx.db.get(data[i].book_id).then((data) => {
          const date = new Date(data?._creationTime);

          borrowedResult.push({
            date: date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일",
            ...data
          });
        })
      }
      return borrowedResult;
    });

    const totalBorrowed = userBorrowed.length;

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
    .collect()
    .then(async (data) => {
      const reservedResult = [];
      for (let i = 0; i < data.length; i++) {
        await ctx.db.get(data[i].book_id).then((data) => {
          const date = new Date(data?._creationTime);

          reservedResult.push({
            date: date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일",
            ...data
          });
        })
      }
      return reservedResult;
    });

    const totalReserved = userReserved.length;

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
      student_id: args.student_id,
      extended: false
    }).then(() => {
      ctx.db.get( args.book_id ).then((item) => {
        if (item.reservation === args.student_id) {
          ctx.db.patch( args.book_id, { 
            borrowed : args.student_id,
            reservation : ""
          })
        }
        else {
          ctx.db.patch( args.book_id, { borrowed : args.student_id } )
        }
      })
    })
    .then(() => 
      ctx.db.insert("book_history", { 
        book_id : args.book_id,
        student_id : args.student_id,
        type: "대출"
      })
    )
    .then(() => {
      ctx.db.patch(args.book_id, { status : "대출중" })
    })

    return getBorrowedList;
  }
})

export const reserveBook = mutation({
  args: {
    book_id: v.id("book_info"),
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const getReservedList = await ctx.db.get(args.book_id).then((data) => {
      if(data.borrowed !== args.student_id) {
        ctx.db.patch(args.book_id, { reservation : args.student_id } )
        .then(() =>
          ctx.db.insert("book_history", { 
            book_id : args.book_id,
            student_id : args.student_id,
            type: "예약"
          })
        )
        .then(() => {
          ctx.db.insert("reserved_list", {
            book_id: args.book_id,
            student_id: args.student_id
          })
        })
      }
      else {
        alert("본인이 대출한 책은 예약할 수 없습니다.");
      }
    })

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
    .then(() => {
      ctx.db.patch( args.book_id, { status : "비치중" })
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
    const bookmarkReq = await ctx.db.query("bookmark_list") // bookmark_list에서 인자로 넘겨준 책 아이디와 학번을 확인하고, 일치하면 
    .filter((q) => {
      return q.eq(q.field("book_id"), args.book_id) && q.eq(q.field("student_id"), args.student_id)
    })
    .collect()
    .then((q) => {
      ctx.db.delete(q[0]._id).then(() => {
        ctx.db.get(args.book_id).then((q) => {
          ctx.db.patch(args.book_id, {
            bookmark_count : q.bookmark_count - 1
          })
        })
      })
    })

    return bookmarkReq;
  }
})

export const callNaverBookApi = action({
  args: {
    title: v.optional(v.string()),
    isbn: v.optional(v.string())
  },
  handler: async (ctx, args) => {
      const data = await fetch(`https://openapi.naver.com/v1/search/book_adv.json?${args.title ? `d_titl=${args.title}` : "d_titl="}${args.isbn ? `&d_isbn=${args.isbn}` : "d_isbn="}`, {
        method: "GET",
        headers: {
          "Accept": "*/*",
          "X-Naver-Client-Id": process.env.NEXT_PUBLIC_API_KEY_NAVER_ID,
          "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_API_KEY_NAVER_PW
        }
      })
      
      if (data.ok) {
        return data.json();
      }
      else {
        return "Naver API 에러입니다."
      }                                                                                                        
  }
})