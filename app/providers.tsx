"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "./context/LanguageContext";

/**
 * Client-side providers for the whole app. Rendered by `RootLayout` inside
 * `<body>` so Server Components can still be passed through as `children`.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

export default Providers;
