import { query } from "./_generated/server";
import { v } from "convex/values";

export const adminlist = query(async (ctx) => {
  console.log("List of admin accounts");
  return await ctx.db.query("admin_account").take(10);
})

export const borrowedhistory = query(async (ctx) => {
  console.log("History of borrowed books");
  return await ctx.db.query("book_borrowed").take(10);
})

export const reservedhistory = query(async (ctx) => {
  console.log("History of reserved books");
  return await ctx.db.query("book_reserved").take(10);
})

export const returnedhistory = query(async (ctx) => {
  console.log("History of returned books");
  return await ctx.db.query("book_returned").take(10);
})

export const booklist = query(async (ctx) => {
  console.log("List of book datas");
  return await ctx.db.query("book_info").collect();
})