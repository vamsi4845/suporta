import { DashboardClientWrapper } from "@/modules/dashboard/ui/components/dashboard-client-wrapper";
import { cookies } from "next/headers";

export const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <DashboardClientWrapper defaultOpen={defaultOpen}>
      {children}
    </DashboardClientWrapper>
  );
};