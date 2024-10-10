import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const sendImage = mutation({
    args: { author: v.string(), file_name: v.string(), description: v.string() },
    handler: async (ctx, args) => {
      
    },
});