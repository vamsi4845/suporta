import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

export const resolve = internalMutation({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    const conversation = await ctx.db.query("conversations").withIndex("by_thread_id", q => q.eq("threadId", args.threadId)).unique();
    if(!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }
    await ctx.db.patch(conversation._id, { status: "resolved" });
    return {
      success: true,
    };
  },
});
export const escalate = internalMutation({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    const conversation = await ctx.db.query("conversations").withIndex("by_thread_id", q => q.eq("threadId", args.threadId)).unique();
    if(!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }
    await ctx.db.patch(conversation._id, { status: "escalated" });
    return {
      success: true,
    };
  },
});

export const getByThreadId = internalQuery({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("conversations").withIndex("by_thread_id", q => q.eq("threadId", args.threadId)).unique();
  },
});

export const deleteWelcomeConversation = internalMutation({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_organization_id", (q) =>
        q.eq("organizationId", args.organizationId)
      )
      .collect();

    for (const conv of conversations) {
      const session = await ctx.db.get(conv.contactSessionId);
      if (session?.email === "system@suporta.ai") {
        await ctx.db.delete(conv._id);
        if (session) {
          await ctx.db.delete(session._id);
        }
        return { deleted: true };
      }
    }
    return { deleted: false };
  },
});