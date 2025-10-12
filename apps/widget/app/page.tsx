"use client";
import { Button } from "@workspace/ui/components/button"
import { useVapi } from "@/modules/hooks/use-vapi";

export default function Page() {
  const { isConnected, transcript, isConnecting, isSpeaking, startCall, endCall } = useVapi();
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <p>Is Connected: {isConnected ? "Yes" : "No"}</p>
        <p>Is Connecting: {isConnecting ? "Yes" : "No"}</p>
        <p>Is Speaking: {isSpeaking ? "Yes" : "No"}</p>
        <Button size="sm" onClick={() => {
          startCall();
        }}>Start Call</Button>
        <Button size="sm" onClick={() => {
          endCall();
        }}>End Call</Button>
        <div className="flex flex-col gap-2"></div>
          {transcript.map((message) => (
            <div key={message.text}>{message.text}</div>
          ))}
        </div>
      </div>
  )
}
 