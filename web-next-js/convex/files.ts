import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const uploadFile = mutation({
    args: {
        author: v.string(),
        file_name: v.string(),
        file_size: v.number(),
        description: v.string(),
        storageId: v.id("_storage"),
        format: v.string()
    },
    handler: async (ctx, args) => {
        const upload = await ctx.db.insert("file_list", {
            author: args.author,
            file_name: args.file_name,
            file_size: args.file_size,
            description: args.description,
            storageId: args.storageId,
            format: args.format
        });

        return upload;
    }
});

export const getFileList = mutation({
    handler: async (ctx) => {
        const fileList = await ctx.db.query("file_list").collect();

        return fileList;
    }
})

export const getFileListByFilter = mutation ({
    args : {
        input: v.string(),
        searchType: v.string(),
        pageNum: v.number()
    },
    handler : async (ctx, args) => {
        let totalLength = 0;
        let totalPages = 0;
        const filteredList = await ctx.db.query("file_list")
        .collect()
        .then((filelist) => {
            const searchResult = filelist.filter((item) => {
                return item?.file_name?.replace(" ", "").toLowerCase().includes(args.input.toLowerCase());
            })
            .filter((item) => {
                if (args.searchType === "image") {
                    return item.format.includes('image');
                }
                else if (args.searchType === "docs") {
                    return item.format.includes('pdf');
                }
                else if (args.searchType === "zip") {
                    return item.format.includes('zip');
                }
                else if (args.searchType === "etc") {
                    return !item.format.includes('pdf') && !item.format.includes('zip') && !item.format.includes('image');
                }
                else {
                    return true;
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
            totalPages : totalPages,
            totalLength : totalLength,
            filteredList : filteredList
        }
    }
})

export const generateDownloadURL = mutation({
    args: {
        key: v.id("_storage")
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.key)
    }
})

export const getFileListByPage = mutation({
    args: {
        page: v.int64(),
        borrowed: v.string(),
        reserved: v.string(),
        type: v.string()
    },
    handler: async (ctx) => {
        const fileList = await ctx.db.query("file_list")
        .collect()
        .then((data) => {
                
            }
        )
        
    }
})