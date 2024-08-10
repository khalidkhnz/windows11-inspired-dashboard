import React from "react";
import "./loading.css";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const WindowsLoading = (props: Props) => {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 flex h-screen w-full items-center justify-center",
        props.className,
      )}
    >
      <div
        style={{
          //@ts-ignore
          "--size": "64px",
          "--dot-size": "6px",
          "--dot-count": "6",
          "--color": "#fff",
          "--speed": "1s",
          "--spread": "60deg",
        }}
        className="dots"
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            //@ts-ignore
            style={{ "--i": index }}
            className="dot"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default WindowsLoading;
