import { InboxLayout } from "@/modules/dashboard/ui/layouts/inbox-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <InboxLayout>
            {children}
        </InboxLayout>
    )
}