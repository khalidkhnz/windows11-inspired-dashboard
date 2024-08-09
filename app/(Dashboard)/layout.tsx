import WindowsLoading from "@/components/WindowsLoading/WindowsLoading";
import React, { Suspense } from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return <Suspense fallback={<WindowsLoading />}>{children}</Suspense>;
};

export default Layout;
