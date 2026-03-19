import utcToKorea from "@/utils/utcToKorea";
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
    pageNum: v.number(),
    studentId:v.optional(v.string())
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
                if (args.reservedFilter === "전체") {
                    return true;
                }
                else if (args.reservedFilter === "예약됨") {
                    return item.reservation && item.reservation !== "";
                }
                else {
                    return !item.reservation || item.reservation === "";
                }
            })

            totalLength = searchResult.length;
            totalPages = (totalLength % 10 == 0) && totalLength != 0 ? Math.floor(totalLength) / 10 : Math.floor(totalLength / 10) + 1;

            return searchResult;
        })
        .then(async (list) => {
          const arr = [];
          const len = list.length
          for(let i = 0; i < len; i++) {
            const bookmarkCount = (await ctx.db.query("bookmark_list").collect()).filter((q) => {return q?.book_id === list[i]?._id}).length;
            const isUserBookmark = (await ctx.db.query("bookmark_list").collect()).filter((q) => {return (q?.book_id === list[i]?._id) && (q?.student_id === args?.studentId)}).length >= 1
            arr.push({bookmarkCount: bookmarkCount, isUserBookmark: isUserBookmark, ...list[i]})
          }

          return arr;
        })
        .then((result) => {
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
  args: {
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const totalData = await ctx.db.query("book_history")
      .withIndex("by_creation_time")
      .order("desc")
      .filter((q) => {
        return q.eq(q.field("student_id"), args.student_id)
      })
      .collect()
      .then(async (data) => {
      const historyResult = [];
      for(let i = 0; i < data.length; i++) {
        const book_data = await ctx.db.get(data[i].book_id);
        historyResult.push({
          ...data[i],
          book_title : book_data.title,
          book_isbn : book_data.isbn,
          time : utcToKorea(data[i]?._creationTime, "onlyTime"),
          date : utcToKorea(data[i]?._creationTime, "onlyDate"),
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
    .filter((q) => {
      return q.eq(q.field("student_id"), args.student_id)
    })
    .collect()
    .then(async (res) => {
      const borrowedResult = [];
      for (let i = 0; i < res.length; i++) {
        await ctx.db.get(res[i].book_id)
        .then((data) => {

          borrowedResult.push({
            book_id: res[i]?.book_id,
            extended: res[i]?.extended,
            date: utcToKorea(res[i]?._creationTime, "onlyDate"),
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
          reservedResult.push({
            book_id: data?._id,
            date: utcToKorea(data?._creationTime, "onlyDate"),
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
    .collect()
    .then(async (data) => {
      const arr = [];
      const len = data.length;

      for (let i = 0; i < len; i++) {
        const bookInfo = await ctx.db.get(data[i].book_id);

        arr.push({
          date: utcToKorea(data[i]?._creationTime),
          student_id: data[i].student_id,
          ...bookInfo
        })
      }

      return arr;
    })

    const totalBookmark = userBookmarks.length;

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
    })
    .then(() => {
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
        ctx.db.patch(args.book_id, { borrowed : ""})
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
    const cancelReq = await ctx.db.query("reserved_list")
    .filter((q) => {
      return q.eq(q.field("student_id"), args.student_id) && q.eq(q.field("book_id"), args.book_id);
    })
    .collect()
    .then((arr) => {
      ctx.db.delete(arr[0]._id)
      .then(() => 
        ctx.db.patch(args.book_id, { reservation : "" })
      ).then(() => 
        ctx.db.insert("book_history", { 
          book_id : args.book_id,
          student_id : args.student_id,
          type: "예약취소"
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
    await ctx.db.insert("bookmark_list", {
      book_id : args.book_id,
      student_id : args.student_id
    })
  }
})

export const cancelBookmark = mutation({
  args: {
    book_id: v.id("book_info"),
    student_id: v.string()
  },
  handler: async (ctx, args) => {
    const resArr = (await ctx.db.query("bookmark_list") // bookmark_list에서 인자로 넘겨준 책 아이디와 학번을 확인하고, 일치하면 
    .collect())
    .filter((item) => {
      return (item?.book_id === args.book_id) && (item?.student_id === args.student_id)
    });

    await ctx.db.delete(resArr[0]._id);
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
        return "Naver API 에러입니다.";
      }                                                                                                        
  }
})

export const bookRecommendationApi = action({
  handler: async (ctx) => {
      const data = await fetch(`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.LIBRARY_API_KEY}&QueryType=ItemNewAll&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101&CategoryId=2719`, {
        method: "GET",
        headers: {
          "Accept": "*/*"
        }
      }) 
      .then(async (resData) => {
          if (resData.ok) {
            return resData.json();
          }

          else {
            throw new Error("추천 도서 API 오류입니다");
          }
      })
      
      return data?.item;
  }
})

export const extendDeadline = mutation({
  args: {
    book_id: v.id("book_info"),
    student_id: v.string()
  },
  handler: async(ctx, args) => {
    await ctx.db.query("borrowed_list").filter((q) => {
      return q.eq(q.field("student_id"), args.student_id) && q.eq(q.field("book_id"), args.book_id)
    })
    .collect()
    .then((result) => {
      ctx.db.get(result[0]?._id).then((data) => {
        if (data?.extended) {
          throw new Error("이미 연장된 책입니다!");
        }
        else {
          ctx.db.patch(data?._id, { extended: true });
        }
      })
    })
    .then(() => {
      ctx.db.insert("book_history",{
        type: "연장",
        student_id: args.student_id,
        book_id: args.book_id
      })
    })
  }
})