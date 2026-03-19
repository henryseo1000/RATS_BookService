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
            if (data.length >= 1) { // true이면 유저 데이터가 정상적으로 저장되어 있다는 뜻
                return true;
            }
            else { // false이면 유저 데이터가 없다는 뜻(신규 가입, 데이터 입력 필요 - 온보딩 과정)
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
                    console.log(data[i])
                    return false;
                }
            }

            return true;
        })

        return isDuplication;
    }
})