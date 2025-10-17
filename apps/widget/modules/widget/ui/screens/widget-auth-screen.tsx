import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { api } from "@workspace/backend/_generated/api";
import { useMutation } from "convex/react";
import { Doc } from "@workspace/backend/_generated/dataModel";

const formSchema = z.object({
    name: z.string().min(1,"Name is required"),
    email: z.string().email("Invalid email address"),
});

const organizationId = "org_2Yq7Q76Q76Q76Q76Q76Q76Q76Q76Q76Q";

export function WidgetAuthScreen() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });


    const createContactSession = useMutation(api.public.contactSessions.createContactSession);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(!organizationId) {
            return;
        }
        const metadata:Doc<"contactSessions">["metadata"] = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: Array.from(navigator.languages),
            platform: navigator.platform,
            vendor: navigator.vendor,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            cookieEnabled: navigator.cookieEnabled,
            referrer: document.referrer || "direct",
            currentUrl: window.location.href,
        }

        const contactSessionId = await createContactSession({
            ...values,
            organizationId,
            metadata,
        });
        console.log(contactSessionId);
    }
    return (
        <div>
                <WidgetHeader>
                <div className="flex flex-col justify-between gap-2 px-2 py-6 font-semibold">
                    <p className="text-3xl ">
                    Hi, there!
                    </p>
                    <p className="text-lg">
                        How can we help you today?
                    </p>
                </div>
            </WidgetHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-y-4 p-4">
                    <FormField control={form.control} name="name" render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="e.g. John Doe" {...field} className="h-10 bg-background" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="e.g. john.doe@example.com" {...field} className="h-10 bg-background" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button disabled={form.formState.isSubmitting} size="lg" type="submit" className="w-full">Continue</Button>
                </form>
            </Form>
        </div>
    )
}