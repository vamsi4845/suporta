import Image from "next/image";


export function ConversationsView() {
    return (
        <div className="flex h-full flex-1 flex-col gap-y-4 bg-muted">
            <div className="flex flex-1 items-center justify-center gap-x-2">
                <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                <p className="text-2xl font-bold">Conversations</p>
            </div>
        </div>
    )
}