import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";


export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if(!session || session.organizationId !== args.organizationId || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });
    }
    const conversationId = await ctx.db.insert("conversations", { threadId: crypto.randomUUID(), organizationId: session.organizationId, contactSessionId: args.contactSessionId, status: "unresolved" });
    return conversationId;
  },
});


export const getOne = query({
  args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if(!session ||  session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });
    }
    const conversation = await ctx.db.get(args.conversationId);
    if(!conversation) {
      return null;
    }
    return {_id: conversation._id, threadId: conversation.threadId,status: conversation.status};
  },
});