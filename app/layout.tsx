"use client";
import { ReduxProvider } from "@/redux/provider";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className="bg-[#09090B]">
        <QueryClientProvider client={queryClient}>
          <ReduxProvider>
            {children}
            <Toaster richColors />
          </ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
