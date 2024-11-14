import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
    args: {
        user_id: v.string(),
        user_name: v.string(),
        real_name: v.string(),
        student_id: v.string(),
        major: v.string(),
        grade: v.string(),
        email: v.string()
    },
    handler: async (ctx, args) => {
        const createUser = ctx.db.insert("user_info", {
            user_id: args.user_id,
            user_name: args.user_name,
            real_name: args.real_name,
            student_id: args.student_id,
            major: args.major,
            grade: args.grade,
            email: args.email
        });

        return createUser;
    }
});

export const checkRequired = mutation({
    args: {
        user_id: v.string()
    },
    handler: async (ctx, args) => {
        const check = ctx.db.query("user_info")
        .filter((q) => {
            return q.eq(q.field("user_id"), args.user_id)
        })
        .collect();

        return check;
    }
});