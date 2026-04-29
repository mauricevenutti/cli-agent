"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { router } from "better-auth/api";
import { useRouter } from "next/dist/client/components/navigation";
import Image from "next/image";

export default function Home() {
  const {data, isPending} = authClient.useSession()
  const router = useRouter();
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner />
      </div>
    )
  }

  if(!data?.session&& !data?.user) {
    router.push("/sign-in")
  }
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="border border-cyan-500 p-6 mb-6 bg-zinc-950">
          <div className="text-cyan-400 text-sm mb-4 tracking-widest">
            ┌─ USER SESSION ──────────────────────┐
          </div>
          <h1 className="text-green-400 text-xl font-bold mb-2">
            $ welcome, {data?.user?.name || "User"}
          </h1>
          <p className="text-cyan-400 text-xs opacity-75">
            &gt; authenticated session active
          </p>
          <div className="text-cyan-400 text-sm mt-4 tracking-widest">
            └────────────────────────────────────┘
          </div>
        </div>

        {/* Profile Info Box */}
        <div className="border border-green-500 p-6 mb-6 bg-zinc-950 space-y-4">
          <div className="text-green-400 text-xs mb-4">
            $ user_info.json
          </div>

          <div className="space-y-3">
            <div className="border-l-2 border-cyan-500 pl-4 py-2">
              <p className="text-cyan-400 text-xs opacity-60">user_id</p>
              <p className="text-green-400 text-sm font-mono">{data?.user?.id || "N/A"}</p>
            </div>

            <div className="border-l-2 border-cyan-500 pl-4 py-2">
              <p className="text-cyan-400 text-xs opacity-60">email</p>
              <p className="text-green-400 text-sm break-all font-mono">{data?.user?.email || "N/A"}</p>
            </div>

            <div className="border-l-2 border-cyan-500 pl-4 py-2">
              <p className="text-cyan-400 text-xs opacity-60">name</p>
              <p className="text-green-400 text-sm font-mono">{data?.user?.name || "Anonymous"}</p>
            </div>

            <div className="border-l-2 border-cyan-500 pl-4 py-2">
              <p className="text-cyan-400 text-xs opacity-60">status</p>
              <p className="text-green-400 text-sm font-mono">✓ authenticated</p>
            </div>
          </div>
        </div>

        {/* Session Details */}
        <div className="border border-cyan-500 p-6 mb-6 bg-zinc-950">
          <div className="text-cyan-400 text-xs mb-4">
            $ session --info
          </div>
          <div className="space-y-2 text-green-400 text-xs">
            <p>&gt; session_id: {data?.session?.id || "N/A"}</p>
            <p>&gt; expires_at: {data?.session?.expiresAt ? new Date(data.session.expiresAt).toISOString() : "N/A"}</p>
            <p>&gt; provider: github</p>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onError: (ctx) => console.log(ctx),
                onSuccess: () => router.push("/sign-in"),
              },
            })
          }
          className="w-full bg-red-600 hover:bg-red-500 text-black font-bold py-3 px-4 border border-red-400 transition-all duration-200 text-sm tracking-wider mb-6"
        >
          $ logout
        </button>

        {/* Footer */}
        <div className="text-center space-y-2 text-cyan-400 text-xs">
          <p className="opacity-60">entropy v1.0.0</p>
        </div>
      </div>
    </div>
  )
}
