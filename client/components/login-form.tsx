"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { GithubIcon } from "lucide-react";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "http://localhost:3000",
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="border border-cyan-500 p-6 mb-8 bg-zinc-950">
          <div className="text-cyan-400 text-sm mb-4 tracking-widest">
            ┌─ ENTROPY LOGIN ─────────────────────┐
          </div>
          <h1 className="text-cyan-300 text-2xl font-bold mb-2">
            $ welcome back to entropy
          </h1>
          <p className="text-green-400 text-xs opacity-75">
            &gt; login to your account for device flow
          </p>
          <div className="text-cyan-400 text-sm mt-4 tracking-widest">
            └────────────────────────────────────┘
          </div>
        </div>

        {/* Login Box */}
        <div className="border border-green-500 p-6 bg-zinc-950 space-y-4">
          <div className="text-green-400 text-xs mb-4">
            $ connecting to github auth...
          </div>

          <button
            onClick={onLogin}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:opacity-50 text-black font-bold py-3 px-4 border border-green-400 transition-all duration-200 text-sm tracking-wider"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⟳</span> AUTHENTICATING...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <Image
                  src={"/github.svg"}
                  alt="Github"
                  height={20}
                  width={20}
                  className="size-5 invert"
                />
                CONTINUE WITH GITHUB
              </span>
            )}
          </button>

          <div className="text-cyan-400 text-xs opacity-50 pt-2">
            [press enter to submit]
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-2">
          <div className="text-green-400 text-xs opacity-60">
            v1.0.0 • entropy authentication system
          </div>
          <div className="text-cyan-400 text-xs opacity-50">
            © 2026 mauricevenutti all rights reserved
          </div>
        </div>
      </div>
    </div>
  );
}
