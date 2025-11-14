"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FiWifi, FiBluetooth, FiVolume2, FiSun, FiMonitor } from "react-icons/fi";
import { MdAirplaneTicket, MdBattery80 } from "react-icons/md";
import { IoAirplaneOutline } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";

export default function QuickSettings() {
  const [brightness, setBrightness] = useState([70]);
  const [volume, setVolume] = useState([50]);

  const quickActions = [
    { icon: <FiWifi />, label: "WiFi", active: true },
    { icon: <FiBluetooth />, label: "Bluetooth", active: false },
    { icon: <IoAirplaneOutline />, label: "Airplane mode", active: false },
    { icon: <MdBattery80 />, label: "Battery saver", active: false },
    { icon: <FiMonitor />, label: "Project", active: false },
  ];

  return (
    <div className="flex w-full flex-col gap-3 p-4">
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-3 gap-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center justify-center gap-2 rounded-lg p-4 transition-all",
              action.active
                ? "bg-blue-600 text-white"
                : "bg-neutral-700/50 text-gray-300 hover:bg-neutral-700",
            )}
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-xs">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Brightness Slider */}
      <div className="rounded-lg bg-neutral-700/50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiSun className="h-5 w-5" />
            <span className="text-sm">Brightness</span>
          </div>
          <span className="text-xs text-gray-400">{brightness[0]}%</span>
        </div>
        <Slider
          value={brightness}
          onValueChange={setBrightness}
          max={100}
          step={1}
          className="cursor-pointer"
        />
      </div>

      {/* Volume Slider */}
      <div className="rounded-lg bg-neutral-700/50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiVolume2 className="h-5 w-5" />
            <span className="text-sm">Volume</span>
          </div>
          <span className="text-xs text-gray-400">{volume[0]}%</span>
        </div>
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          className="cursor-pointer"
        />
      </div>

      {/* Battery Status */}
      <div className="rounded-lg bg-neutral-700/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MdBattery80 className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-sm font-medium">Battery</p>
              <p className="text-xs text-gray-400">80% remaining</p>
            </div>
          </div>
          <span className="text-sm text-gray-400">3h 20m</span>
        </div>
      </div>
    </div>
  );
}
