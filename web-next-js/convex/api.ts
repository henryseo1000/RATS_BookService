import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query(async (ctx) => {
  console.log("give me data of admin_account");
  return await ctx.db.query("admin_account").take(10);
})

export const post_admin_account = query(async (ctx) => {
  console.log("give me data of admin_account");
  return await ctx.db.query("admin_account").take(10);
})