import { ConvexError } from "convex/values";
import { query } from "../_generated/server";

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    // Count by status
    const unresolved = await ctx.db
      .query("conversations")
      .withIndex("by_status_and_organization_id", (q) =>
        q.eq("status", "unresolved").eq("organizationId", orgId)
      )
      .collect();

    const resolved = await ctx.db
      .query("conversations")
      .withIndex("by_status_and_organization_id", (q) =>
        q.eq("status", "resolved").eq("organizationId", orgId)
      )
      .collect();

    const escalated = await ctx.db
      .query("conversations")
      .withIndex("by_status_and_organization_id", (q) =>
        q.eq("status", "escalated").eq("organizationId", orgId)
      )
      .collect();

    // Calculate daily volume for the last 7 days
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    
    const allConversations = await ctx.db
        .query("conversations")
        .withIndex("by_organization_id", (q) => q.eq("organizationId", orgId))
        .collect();

    const last7Days = allConversations.filter(c => c._creationTime > sevenDaysAgo);
    
    const volumeByDate = last7Days.reduce((acc, curr) => {
        const date = new Date(curr._creationTime).toISOString().split('T')[0];
        if (date) {
            acc[date] = (acc[date] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    // Fill in missing days with 0
    for (let i = 0; i < 7; i++) {
        const d = new Date(now - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        if (d && !volumeByDate[d]) {
            volumeByDate[d] = 0;
        }
    }

    const volumeData = Object.entries(volumeByDate).map(([date, count]) => ({
        date,
        count
    })).sort((a, b) => a.date.localeCompare(b.date));

    return {
      statusDistribution: [
        { status: "unresolved", count: unresolved.length, fill: "var(--color-unresolved)" },
        { status: "resolved", count: resolved.length, fill: "var(--color-resolved)" },
        { status: "escalated", count: escalated.length, fill: "var(--color-escalated)" },
      ],
      totalConversations: allConversations.length,
      volumeByDate: volumeData
    };
  },
});
