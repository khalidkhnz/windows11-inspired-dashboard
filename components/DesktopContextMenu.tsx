"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  FiRefreshCw,
  FiMonitor,
  FiSettings,
  FiLayers,
  FiUser,
} from "react-icons/fi";
import { MdOutlineViewModule } from "react-icons/md";
import { BiSortAlt2 } from "react-icons/bi";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export default function DesktopContextMenu({
  x,
  y,
  onClose,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [subMenu, setSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const menuItems = [
    {
      label: "View",
      icon: <MdOutlineViewModule className="h-4 w-4" />,
      hasSubmenu: true,
      submenu: [
        { label: "Large icons" },
        { label: "Medium icons" },
        { label: "Small icons" },
        { divider: true },
        { label: "Auto arrange icons" },
        { label: "Align icons to grid" },
        { divider: true },
        { label: "Show desktop icons", checked: true },
      ],
    },
    {
      label: "Sort by",
      icon: <BiSortAlt2 className="h-4 w-4" />,
      hasSubmenu: true,
      submenu: [
        { label: "Name" },
        { label: "Size" },
        { label: "Item type" },
        { label: "Date modified" },
      ],
    },
    {
      label: "Refresh",
      icon: <FiRefreshCw className="h-4 w-4" />,
      action: () => {
        window.location.reload();
      },
    },
    { divider: true },
    {
      label: "Paste",
      disabled: true,
    },
    {
      label: "Paste shortcut",
      disabled: true,
    },
    { divider: true },
    {
      label: "New",
      icon: <FiLayers className="h-4 w-4" />,
      hasSubmenu: true,
      submenu: [
        { label: "Folder" },
        { label: "Shortcut" },
        { divider: true },
        { label: "Text Document" },
      ],
    },
    { divider: true },
    {
      label: "Display settings",
      icon: <FiMonitor className="h-4 w-4" />,
    },
    {
      label: "Personalize",
      icon: <FiSettings className="h-4 w-4" />,
    },
  ];

  return (
    <div
      ref={menuRef}
      style={{ top: y, left: x }}
      className="fixed z-[100] min-w-[280px] animate-in fade-in-0 zoom-in-95 rounded-lg border border-gray-700/50 bg-neutral-900/95 py-2 text-white shadow-2xl backdrop-blur-xl"
    >
      {menuItems.map((item, index) =>
        item.divider ? (
          <div
            key={index}
            className="my-1 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"
          />
        ) : (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => item.hasSubmenu && setSubMenu(item.label)}
            onMouseLeave={() => item.hasSubmenu && setSubMenu(null)}
          >
            <div
              onClick={() => {
                if (item.action) {
                  item.action();
                  onClose();
                } else if (!item.hasSubmenu) {
                  onClose();
                }
              }}
              className={cn(
                "flex items-center justify-between px-3 py-2 text-sm transition-colors",
                {
                  "cursor-pointer hover:bg-white/10": !item.disabled,
                  "cursor-not-allowed text-gray-500": item.disabled,
                },
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && <span className="text-gray-300">{item.icon}</span>}
                <span>{item.label}</span>
              </div>
              {item.hasSubmenu && (
                <span className="text-xs text-gray-400">▶</span>
              )}
            </div>

            {/* Submenu */}
            {item.hasSubmenu && subMenu === item.label && item.submenu && (
              <div className="absolute left-full top-0 ml-1 min-w-[220px] animate-in fade-in-0 zoom-in-95 rounded-lg border border-gray-700/50 bg-neutral-900/95 py-2 shadow-2xl backdrop-blur-xl">
                {item.submenu.map((subItem, subIndex) =>
                  subItem.divider ? (
                    <div
                      key={subIndex}
                      className="my-1 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"
                    />
                  ) : (
                    <div
                      key={subIndex}
                      onClick={() => {
                        onClose();
                      }}
                      className="flex items-center justify-between px-3 py-2 text-sm hover:bg-white/10"
                    >
                      <span>{subItem.label}</span>
                      {subItem.checked && (
                        <span className="text-blue-400">✓</span>
                      )}
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
}
