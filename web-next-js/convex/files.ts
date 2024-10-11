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