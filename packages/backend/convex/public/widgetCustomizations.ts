import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const upsert = mutation({
  args: {
    organizationId: v.string(),
    buttonColor: v.string(),
    position: v.union(v.literal("bottom-right"), v.literal("bottom-left")),
    logoUrl: v.optional(v.string()),
    primaryColor: v.string(),
    backgroundColor: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("widgetCustomizations")
      .withIndex("by_organization_id", (q) =>
        q.eq("organizationId", args.organizationId)
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        buttonColor: args.buttonColor,
        position: args.position,
        logoUrl: args.logoUrl,
        primaryColor: args.primaryColor,
        backgroundColor: args.backgroundColor,
      });
      return existing._id;
    } else {
      const id = await ctx.db.insert("widgetCustomizations", {
        organizationId: args.organizationId,
        buttonColor: args.buttonColor,
        position: args.position,
        logoUrl: args.logoUrl,
        primaryColor: args.primaryColor,
        backgroundColor: args.backgroundColor,
      });
      return id;
    }
  },
});

export const getByOrganizationId = query({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const customization = await ctx.db
      .query("widgetCustomizations")
      .withIndex("by_organization_id", (q) =>
        q.eq("organizationId", args.organizationId)
      )
      .unique();

    return customization;
  },
});

