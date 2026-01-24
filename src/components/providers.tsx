"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AccessibilityProvider } from "./providers/AccessibilityProvider";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <AccessibilityProvider>
                {children}
            </AccessibilityProvider>
        </NextThemesProvider>
    );
}
