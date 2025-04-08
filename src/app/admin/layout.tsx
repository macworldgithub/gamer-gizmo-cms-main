"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import RootLayout from "@/components/layout/index";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  useLayoutEffect(() => {
    if (!localStorage.getItem("admin-x-token")) {
      router.push("/auth/login");
    }
  }, [router]);

  return <RootLayout>{children}</RootLayout>;
}
