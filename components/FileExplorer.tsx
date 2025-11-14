"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiRefreshCw,
  FiSearch,
  FiFolder,
  FiFile,
  FiHome,
  FiMonitor,
  FiDownload,
  FiImage,
  FiMusic,
  FiVideo,
} from "react-icons/fi";
import { ICONS } from "@/lib/icons";
import { Input } from "./ui/input";

interface FileItem {
  name: string;
  type: "folder" | "file";
  size?: string;
  modified?: string;
  icon?: any;
}

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState("This PC");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const sidebarItems = [
    { icon: <FiHome />, label: "Quick access", path: "Quick access" },
    { icon: <FiMonitor />, label: "This PC", path: "This PC" },
    { icon: <FiDownload />, label: "Downloads", path: "Downloads" },
    { icon: <FiImage />, label: "Pictures", path: "Pictures" },
    { icon: <FiMusic />, label: "Music", path: "Music" },
    { icon: <FiVideo />, label: "Videos", path: "Videos" },
  ];

  const fileItems: FileItem[] = [
    {
      name: "Documents",
      type: "folder",
      modified: "Yesterday",
      icon: ICONS.USERFOLER,
    },
    {
      name: "Downloads",
      type: "folder",
      modified: "2 days ago",
      icon: ICONS.DOWNLOADS,
    },
    {
      name: "Pictures",
      type: "folder",
      modified: "Last week",
      icon: ICONS.USERFOLER,
    },
    {
      name: "Resume.pdf",
      type: "file",
      size: "256 KB",
      modified: "Today",
      icon: ICONS.PDFICON,
    },
    {
      name: "Portfolio",
      type: "folder",
      modified: "3 days ago",
      icon: ICONS.USERFOLER,
    },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-neutral-900/50">
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-gray-700/50 bg-neutral-800/80 px-3 py-2">
        <button className="rounded p-1 hover:bg-white/10">
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <button className="rounded p-1 hover:bg-white/10">
          <FiChevronRight className="h-5 w-5" />
        </button>
        <button className="rounded p-1 hover:bg-white/10">
          <FiChevronUp className="h-5 w-5" />
        </button>
        <button className="rounded p-1 hover:bg-white/10">
          <FiRefreshCw className="h-5 w-5" />
        </button>

        {/* Address Bar */}
        <div className="ml-2 flex flex-1 items-center gap-1 rounded-md bg-neutral-900/50 px-3 py-1.5 text-sm">
          <FiMonitor className="h-4 w-4" />
          <span>{currentPath}</span>
        </div>

        {/* Search */}
        <div className="relative w-48">
          <Input
            placeholder="Search..."
            className="h-8 bg-neutral-900/50 pl-8 text-xs"
          />
          <FiSearch className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-700/50 bg-neutral-800/50 p-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentPath(item.path)}
              className={cn(
                "flex w-full items-center gap-2 rounded px-3 py-2 text-sm transition-colors",
                currentPath === item.path
                  ? "bg-blue-600/30 text-blue-300"
                  : "text-gray-300 hover:bg-white/5",
              )}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Grid View */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {fileItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item.name)}
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-2 rounded-lg p-3 transition-all hover:bg-white/10",
                  selectedItem === item.name && "bg-blue-600/20",
                )}
              >
                <div className="relative h-12 w-12">
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  ) : item.type === "folder" ? (
                    <FiFolder className="h-12 w-12 text-yellow-400" />
                  ) : (
                    <FiFile className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{item.name}</p>
                  <p className="text-[10px] text-gray-400">
                    {item.size || item.modified}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between border-t border-gray-700/50 bg-neutral-800/80 px-4 py-1 text-xs text-gray-400">
        <span>{fileItems.length} items</span>
        <span>{selectedItem ? `${selectedItem} selected` : ""}</span>
      </div>
    </div>
  );
}
