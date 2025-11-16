import type {WebhookEvent} from "@clerk/backend";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { httpAction } from "./_generated/server";
import { createClerkClient } from "@clerk/backend";
import { internal } from "./_generated/api";


const http = httpRouter();


const clerkClient = createClerkClient({
    secretKey:process.env.CLERK_SECRET_KEY
}) 

async function validateRequest(req:Request):Promise<WebhookEvent | null>{
    const payloadString = await req.text();
    const svixHeaders ={
        "svix-id":req.headers.get("svix-id") || "",
        "svix-timestamp":req.headers.get("svix-timestamp") || "",
        "svix-signature":req.headers.get("svix-signature") || "",
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!)

    try{
        return wh.verify(payloadString,svixHeaders) as unknown as WebhookEvent
    }catch(error){
        console.error(`Error Verifying Webhook event ${error}`)
    }
    return null;
}

http.route({
    path:"/clerk-webhook",
    method:"POST",
    handler:httpAction(async (ctx,request)=>{
        const event = await validateRequest(request);

        if(!event){
            return new Response("Error occurred",{status:400})
        }

        switch(event.type){
            case "organization.created":{
                const organization = event.data as {
                    id:string;
                    name?:string;
                };

                const organizationId = organization.id;
                const organizationName = organization.name;

                if(!organizationId){
                    return new Response("Missing Organization Id",{status:400})
                }

                await ctx.runMutation(internal.system.organizations.createWelcomeConversation,{
                    organizationId,
                    organizationName,
                })

                break;
            }
            case "subscription.updated":{
                const subscription = event.data as {
                    status:string;
                    payer?:{
                        organization_id:string;
                    }
                };

                const organizationId = subscription.payer?.organization_id;


                if(!organizationId){
                    return new Response("Missing Organization Id",{status:400})
                }

                await clerkClient.organizations.updateOrganization(organizationId,{
                    maxAllowedMemberships:subscription.status === "active"? 3 : 1
                })

                await ctx.runMutation(internal.system.subscriptions.upsert,{
                    organizationId,
                    status:subscription.status
                })

                break;
            }
            default:{
                console.log("Ignore Events",event.type)
            }
        }

        return new Response(null,{status:200})
    })
})

export default http;