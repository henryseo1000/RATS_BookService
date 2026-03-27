import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
    args: {
        real_name: v.string(),
        student_id: v.string(),
        major: v.string(),
        grade: v.string(),
        username: v.string()
    },
    handler: async (ctx, args) => {
        const userData = await ctx.auth.getUserIdentity()
        .then((data) => {
            if (data === null) {
                throw new Error("Not authenticated");
            }
            else {
                return data;
            }
        })
        .then(async (data) => {
            const createUser = await ctx.db.insert("user_info", {
                user_id: data.tokenIdentifier.split("|")[1],
                real_name: args.real_name,
                student_id: args.student_id,
                major: args.major,
                grade: args.grade,
                user_email: data.email,
                username: args.username
            });

            return createUser;
        })

        return userData;
    }
});

export const getUserData = mutation({
    args: {
        user_id : v.string()
    },
    handler: async (ctx, args) => {
        const userData = await ctx.db.query("user_info")
        .filter((q) => {
            return q.eq(q.field("user_id"), args.user_id)
        })
        .collect();

        return userData[0]!;
    }
})

export const checkRequired = mutation({
    args: {
        user_id: v.string()
    },
    handler: async (ctx, args) => {
        const check = await ctx.db.query("user_info")
        .filter((q) => {
            return q.eq(q.field("user_id"), args.user_id)
        })
        .collect()
        .then((data) => {
            if (data.length >= 1) {
                return true;
            }
            else {
                return false;
            }
        })

        return check;
    }
});

export const checkStudentId = mutation({
    args: {
        student_id : v.string()
    },
    handler: async (ctx, args) => {
        const isDuplication = await ctx.db.query("user_info")
        .collect()
        .then((data) => {
            const len = data.length;
            for (let i = 0; i < len; i++) {
                if (data[i]?.student_id === args.student_id) {
                    return false;
                }
            }

            return true;
        })

        return isDuplication;
    }
})

export const editUserData = mutation({
    args: {
        user_id: v.string(),
        name: v.string(),
        student_id: v.string(),
        major: v.string(),
        grade: v.string()
    },
    handler: async (ctx, args) => {
        const dbId = await ctx.db.query("user_info")
        .filter((q) => q.eq(q.field("user_id"), args.user_id))
        .collect()

        await ctx.db.patch(dbId[0]?._id, {
            real_name: args.name,
            student_id: args.student_id,
            major: args.major,
            grade: args.grade
        })

        return await ctx.db.get(dbId[0]?._id);
    }
})