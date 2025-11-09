import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";
import { AUTO_REFRESH_MS, SESSION_DURATION_MS } from "../constants";



export const refresh = internalMutation({
  args:{
    contactSessionId:v.id("contactSessions")
  },
  handler:async(ctx,args)=>{
    const contactSession = await ctx.db.get(args.contactSessionId);


    if(!contactSession){
      throw new ConvexError({
        code:"Not_Found",
        message:"Contact Session Not Found"
      })
    }
    if(contactSession.expiresAt < Date.now()){
      throw new ConvexError({
        code:"BAD_REQUEST",
        message:"Contact Session expired"
      })
    }


    const timeRemaining = contactSession.expiresAt - Date.now();

    if(timeRemaining<AUTO_REFRESH_MS){
      const newExpiresAt = Date.now() + SESSION_DURATION_MS;
      await ctx.db.patch(args.contactSessionId,{expiresAt:newExpiresAt})

      return {...contactSession,expiresAt:newExpiresAt}
    }

    return contactSession;
  }
})

export const getOne = internalQuery({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.contactSessionId);
  },
});