"use client";

import { contactSessionIdAtomFamily, errorMessageAtom, loadingMessageAtom, organizationIdAtom, screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { api } from "@workspace/backend/_generated/api";
import { useAction, useMutation } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";

type InitStep = "storage" | "org" | "session" | "settings"| "done";

export function WidgetLoadingScreen({organizationId}:{organizationId: string | null}) {
    const [step, setStep] = useState<InitStep>("org");
    const [sessionValid,setSessionValid] = useState<boolean>(false);
    const setOrganizationId = useSetAtom(organizationIdAtom);
    const loadingMessage = useAtomValue(loadingMessageAtom);
    const setErrorMessage = useSetAtom(errorMessageAtom);
    const setLoadingMessage = useSetAtom(loadingMessageAtom);
    const setScreen = useSetAtom(screenAtom);
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId!));
    const validateOrganization = useAction(api.public.organizations.validate);
    const validateContactSession = useMutation(api.public.contactSessions.validate);


    useEffect(() => {
        if(step !== "org") {
            return;
        }
        setLoadingMessage("Loading organization");

        if(!organizationId){
            setErrorMessage("Organization ID is required");
            setScreen("error");
            return;
        }

        setLoadingMessage("Verifying organization...");

        validateOrganization({organizationId: organizationId!}).then(({valid,error}) => {
            if(!valid){
                setErrorMessage(error || "Organization not found");
                setScreen("error");
            }
            setOrganizationId(organizationId);
            setStep("session");
        }).catch(() => {
            setErrorMessage("Unable to verify organization");
            setScreen("error");
            return;
        }).finally(() => {
            setLoadingMessage("Organization verified");
            setStep("session");
        });
        
    }, [step,organizationId,setErrorMessage,setScreen,setLoadingMessage,setOrganizationId,setStep,validateOrganization]);



    useEffect(() => {
        if(step !== "session") {
            return;
        }
        setLoadingMessage("Finding session...");
        if(!contactSessionId){
            setSessionValid(false);
            setStep("done");
            return;
        }
        setLoadingMessage("Validating session...");
        validateContactSession({contactSessionId}).then((result) => {
            setSessionValid(result.valid);
            setStep("done");
        }).catch(() => {
            setSessionValid(false);
            setStep("done");
        });
    }, [step,setLoadingMessage,contactSessionId,setSessionValid,setStep,validateContactSession]);


    useEffect(() => {
        if(step !== "done") {
            return;
        }
        const hasValidSession = contactSessionId && sessionValid;
        setScreen(hasValidSession ? "selection" : "auth");
    }, [step,setScreen,sessionValid,contactSessionId]);

    return (
        <>
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
            <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
                <LoaderIcon className="h-8 w-8 animate-spin" />
                <p className="text-muted-foreground text-sm font-normal">{loadingMessage || "Loading..."}</p>
            </div>
        </>
    )
}