import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { supportAgent } from "../system/ai/agents/supportAgent";
import { saveMessage } from "@convex-dev/agent";
import { components } from "../_generated/api";


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
    const {threadId} = await supportAgent.createThread(ctx, {userId: args.organizationId});
    await saveMessage(ctx,components.agent,{
      threadId,
      message:{
        content: "Hello, how can I help you today?",
        role: "assistant",
      }
    });
    const conversationId = await ctx.db.insert("conversations", { threadId, organizationId: session.organizationId, contactSessionId: args.contactSessionId, status: "unresolved" });
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
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }
    if(conversation.contactSessionId !== session._id) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Incorrect conversation",
      });
    }
    return {_id: conversation._id, threadId: conversation.threadId,status: conversation.status};
  },
});