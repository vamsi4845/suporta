"use client"

import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { OrgGuard } from "@/modules/auth/ui/components/org-guard";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { Provider } from "jotai";

interface DashboardClientWrapperProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function DashboardClientWrapper({ children, defaultOpen }: DashboardClientWrapperProps) {
  return (
    <AuthGuard>
      <OrgGuard>
        <Provider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <DashboardSidebar />
            <main className="flex flex-1 flex-col">
              {children}
            </main>
          </SidebarProvider>
        </Provider>
      </OrgGuard>
    </AuthGuard>
  );
}

