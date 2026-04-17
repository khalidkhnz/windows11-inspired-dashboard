import { Suspense } from "react";
import WindowsLoading from "@/components/WindowsLoading/WindowsLoading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<WindowsLoading />}>{children}</Suspense>;
}
