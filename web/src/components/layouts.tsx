"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/system";
import { useEffect, useState } from "react";

export default function FormLayout({ children }: any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted)
    return (
        <section className="flex flex-col justify-center h-[100vh] items-center align-center width-100">
          {children}
        </section>
    );

  return (
    <NextUIProvider>
      <NextThemesProvider>
        <section id="main-auth-section" className="flex flex-col justify-center h-[100vh] w-[100vw] items-center align-center width-100">
          {children}
        </section>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
