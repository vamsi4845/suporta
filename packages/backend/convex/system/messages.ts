import { ConvexError, v } from "convex/values";
import { action, query } from "../_generated/server";
import { api } from "../_generated/api";
import { internal } from "../_generated/api";
import { supportAgent } from "./ai/agents/supportAgent";
import { paginationOptsValidator } from "convex/server";

export const create = action({
  args: {
    threadId: v.string(),
    prompt: v.string(),
    contactSessionId: v.id("contactSessions"),
    },
    handler: async (ctx, args) => {
        const contactSession = await ctx.runQuery(internal.system.contactSessions.getOne, { contactSessionId: args.contactSessionId });
        if(!contactSession || contactSession.expiresAt < Date.now()) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Invalid contact session",
            });
        }
        const conversation = await ctx.runQuery(internal.system.conversations.getByThreadId, { threadId: args.threadId });
        if(!conversation) {
            throw new ConvexError({
                code: "NOT_FOUND",
                message: "Conversation not found",
            });
        }

        if(conversation.status === "resolved") {
            throw new ConvexError({
                code: "BAD_REQUEST",
                message: "Conversation is resolved",
            });
        }


        await supportAgent.generateText(ctx, {threadId: args.threadId},{prompt: args.prompt},);
    },
});


export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts:paginationOptsValidator,
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);
    if(!contactSession || contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid contact session",
      });
    }
    const paginatedItems = supportAgent.listMessages(ctx,{threadId: args.threadId, paginationOpts: args.paginationOpts});

    return paginatedItems;
  },
});