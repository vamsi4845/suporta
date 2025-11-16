import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useAtomValue, useSetAtom } from "jotai";
import { customizationAtom, organizationIdAtom } from "../atoms/widget-atoms";
import { useEffect } from "react";

export function useWidgetCustomization() {
  const organizationId = useAtomValue(organizationIdAtom);
  const setCustomization = useSetAtom(customizationAtom);
  
  const customization = useQuery(
    api.public.widgetCustomizations.getByOrganizationId,
    organizationId ? { organizationId } : "skip"
  );

  useEffect(() => {
    if (customization) {
      setCustomization({
        buttonColor: customization.buttonColor,
        position: customization.position,
        logoUrl: customization.logoUrl || null,
        primaryColor: customization.primaryColor,
        backgroundColor: customization.backgroundColor || "#ffffff",
      });
    } else {
      setCustomization({
        buttonColor: "#1972f5",
        position: "bottom-right",
        logoUrl: null,
        primaryColor: "#1972f5",
        backgroundColor: "#ffffff",
      });
    }
  }, [customization, setCustomization]);

  return useAtomValue(customizationAtom);
}

