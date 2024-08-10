import WindowsLoading from "@/components/WindowsLoading/WindowsLoading";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return <WindowsLoading className="fixed left-0 top-0 h-screen w-full" />;
};

export default loading;
