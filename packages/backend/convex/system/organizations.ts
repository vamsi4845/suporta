import { v } from "convex/values";
import { internalMutation } from "../_generated/server";
import { supportAgent } from "./ai/agents/supportAgent";
import { saveMessage } from "@convex-dev/agent";
import { components } from "../_generated/api";
import { SESSION_DURATION_MS } from "../constants";

export const createWelcomeConversation = internalMutation({
  args: {
    organizationId: v.string(),
    organizationName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingConversations = await ctx.db
      .query("conversations")
      .withIndex("by_organization_id", (q) =>
        q.eq("organizationId", args.organizationId)
      )
      .collect();

    for (const conv of existingConversations) {
      const session = await ctx.db.get(conv.contactSessionId);
      if (session?.email === "system@suporta.ai") {
        return null;
      }
    }


    const expiresAt = Date.now() + SESSION_DURATION_MS * 365;
    const systemSessionId = await ctx.db.insert("contactSessions", {
      name: "Suporta Team",
      email: "system@suporta.ai",
      organizationId: args.organizationId,
      expiresAt,
    });


    const { threadId } = await supportAgent.createThread(ctx, {
      userId: args.organizationId,
    });

    const welcomeMessage = args.organizationName
      ? `Welcome to Suporta, ${args.organizationName}! We're excited to have you on board. This is your support inbox where you'll manage conversations with your customers. Get started by customizing your widget and uploading your data sources.`
      : `Welcome to Suporta! We're excited to have you on board. This is your support inbox where you'll manage conversations with your customers. Get started by customizing your widget and uploading your data sources.`;

    await saveMessage(ctx, components.agent, {
      threadId,
      message: {
        content: welcomeMessage,
        role: "user",
      },
    });


    const conversationId = await ctx.db.insert("conversations", {
      threadId,
      organizationId: args.organizationId,
      contactSessionId: systemSessionId,
      status: "resolved",
    });


    return conversationId;
  },
});

