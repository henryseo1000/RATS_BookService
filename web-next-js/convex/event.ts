import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserEventList = mutation({
    args: {
        student_id: v.string()
    },
    handler: async (ctx, args) => {
        const userEvents = await ctx.db.query('event_list')
        .filter((q) => {
            return q.eq(q.field("student_id"), args.student_id);
        })
        .withIndex('by_creation_time')
        .order('desc')
        .collect();

        return userEvents;
    }
})

export const getUserEventByDate = mutation({
    args: {
        student_id: v.string(),
        date: v.float64()
    },
    handler: async (ctx, args) => {
        const nextDay = new Date(args.date);
        nextDay.setDate(nextDay.getDate() + 1);

        const userEventsByDate1 = await ctx.db.query('event_list')
        .filter((q) => { return q.neq(q.field('type'), 'book_return')})
        .filter((q) => { return q.eq(q.field('student_id'), args.student_id) })
        .filter((q) => { return q.lte(q.field('_creationTime'), nextDay.getTime()) })
        .filter((q) => { return q.lte(new Date(args.date).getTime(), q.field('_creationTime')) })
        .collect();

        const userEventsByDate2 = await ctx.db.query('event_list')
        .filter((q) => { return q.neq(q.field('type'), 'book_borrow')})
        .filter((q) => { return q.eq(q.field('student_id'), args.student_id) })
        .filter((q) => { return q.lte(q.field('due_date'), nextDay.getTime()) })
        .filter((q) => { return q.lte(new Date(args.date).getTime(), q.field('due_date')) })
        .collect();

        const resArr = [...userEventsByDate1, ...userEventsByDate2];

        return {
            filteredList: resArr,
            totalNum: resArr.length
        }
    }
})

export const getOfficialEvents = mutation({
    handler: async (ctx) => {
        const officialEventList = await ctx.db.query('event_list')
        .filter((q) => {
            return q.eq(q.field("type"), "official")
        })
        .order('desc')
        .collect();

        const len = officialEventList.length;

        return {
            officialList: officialEventList,
            totalLength: len
        }
    }
})