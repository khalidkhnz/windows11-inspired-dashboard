"use client";

import { cn } from "@/lib/utils";

interface SnapLayoutsProps {
  onSelectLayout: (layout: string) => void;
  onClose: () => void;
}

export default function SnapLayouts({
  onSelectLayout,
  onClose,
}: SnapLayoutsProps) {
  const layouts = [
    {
      id: "left",
      label: "Snap left half",
      preview: (
        <div className="grid h-12 w-16 grid-cols-2 gap-[2px] rounded border border-gray-600">
          <div className="rounded-l bg-blue-500/50" />
          <div className="rounded-r bg-gray-600/30" />
        </div>
      ),
    },
    {
      id: "right",
      label: "Snap right half",
      preview: (
        <div className="grid h-12 w-16 grid-cols-2 gap-[2px] rounded border border-gray-600">
          <div className="rounded-l bg-gray-600/30" />
          <div className="rounded-r bg-blue-500/50" />
        </div>
      ),
    },
    {
      id: "top-left",
      label: "Snap top-left quarter",
      preview: (
        <div className="grid h-12 w-16 grid-cols-2 grid-rows-2 gap-[2px] rounded border border-gray-600">
          <div className="rounded-tl bg-blue-500/50" />
          <div className="bg-gray-600/30" />
          <div className="bg-gray-600/30" />
          <div className="rounded-br bg-gray-600/30" />
        </div>
      ),
    },
    {
      id: "top-right",
      label: "Snap top-right quarter",
      preview: (
        <div className="grid h-12 w-16 grid-cols-2 grid-rows-2 gap-[2px] rounded border border-gray-600">
          <div className="bg-gray-600/30" />
          <div className="rounded-tr bg-blue-500/50" />
          <div className="bg-gray-600/30" />
          <div className="rounded-br bg-gray-600/30" />
        </div>
      ),
    },
    {
      id: "bottom-left",
      label: "Snap bottom-left quarter",
      preview: (
        <div className="grid h-12 w-16 grid-cols-2 grid-rows-2 gap-[2px] rounded border border-gray-600">
          <div className="bg-gray-600/30" />
          <div className="bg-gray-600/30" />
          <div className="rounded-bl bg-blue-500/50" />
          <div className="bg-gray-600/30" />
        </div>
      ),
    },
    {
      id: "bottom-right",
      label: "Snap bottom-right quarter",
      preview: (
        <div className="grid h-12 w-16 grid-cols-2 grid-rows-2 gap-[2px] rounded border border-gray-600">
          <div className="bg-gray-600/30" />
          <div className="bg-gray-600/30" />
          <div className="bg-gray-600/30" />
          <div className="rounded-br bg-blue-500/50" />
        </div>
      ),
    },
  ];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute -top-2 right-0 z-50 grid grid-cols-2 gap-3 rounded-lg border border-gray-700/50 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-xl"
    >
      {layouts.map((layout) => (
        <button
          key={layout.id}
          onClick={() => {
            onSelectLayout(layout.id);
            onClose();
          }}
          className="group relative flex flex-col items-center gap-2 rounded-md p-2 transition-colors hover:bg-white/10"
          title={layout.label}
        >
          {layout.preview}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-800 px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
            {layout.label}
          </span>
        </button>
      ))}
    </div>
  );
}
