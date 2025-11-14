"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  FiSun,
  FiCloud,
  FiCloudRain,
  FiCalendar,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";
import { BsNewspaper } from "react-icons/bs";
import Image from "next/image";

export default function WidgetsPanel() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const weatherData = {
    temp: 24,
    condition: "Partly Cloudy",
    high: 28,
    low: 18,
    icon: <FiCloud className="h-12 w-12" />,
  };

  const newsItems = [
    {
      title: "Windows 11 introduces new features",
      source: "Tech News",
      time: "2h ago",
    },
    {
      title: "Latest updates in web development",
      source: "Dev Weekly",
      time: "4h ago",
    },
    {
      title: "AI transforming the tech industry",
      source: "Tech Insights",
      time: "6h ago",
    },
  ];

  const upcomingEvents = [
    { title: "Team Meeting", time: "2:00 PM", color: "bg-blue-500" },
    { title: "Project Deadline", time: "5:00 PM", color: "bg-red-500" },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Widgets</h2>
        <button className="rounded-md p-2 hover:bg-white/10">
          <FiActivity className="h-5 w-5" />
        </button>
      </div>

      {/* Weather Widget */}
      <div className="overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-300">Current Weather</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-5xl font-light">{weatherData.temp}°</span>
              <div className="text-gray-300">{weatherData.icon}</div>
            </div>
            <p className="mt-2 text-sm text-gray-300">{weatherData.condition}</p>
            <div className="mt-4 flex gap-4 text-xs text-gray-400">
              <span>H: {weatherData.high}°</span>
              <span>L: {weatherData.low}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Widget */}
      <div className="rounded-xl bg-neutral-800/70 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2">
          <FiCalendar className="h-5 w-5 text-blue-400" />
          <h3 className="font-semibold">Today's Schedule</h3>
        </div>
        <div className="mb-2 text-sm text-gray-400">
          {format(time, "EEEE, MMMM d, yyyy")}
        </div>
        <div className="space-y-2">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg bg-neutral-700/50 p-3"
            >
              <div className={cn("h-2 w-2 rounded-full", event.color)} />
              <div className="flex-1">
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-gray-400">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Widget */}
      <div className="rounded-xl bg-neutral-800/70 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2">
          <BsNewspaper className="h-5 w-5 text-orange-400" />
          <h3 className="font-semibold">News</h3>
        </div>
        <div className="space-y-3">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-lg bg-neutral-700/30 p-3 transition-colors hover:bg-neutral-700/50"
            >
              <p className="text-sm font-medium leading-snug">{item.title}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                <span>{item.source}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Widget */}
      <div className="rounded-xl bg-neutral-800/70 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2">
          <FiTrendingUp className="h-5 w-5 text-green-400" />
          <h3 className="font-semibold">Market Watch</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-neutral-700/30 p-3">
            <div>
              <p className="text-sm font-medium">NASDAQ</p>
              <p className="text-xs text-gray-400">Tech Index</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-400">+2.4%</p>
              <p className="text-xs text-gray-400">15,234.56</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-neutral-700/30 p-3">
            <div>
              <p className="text-sm font-medium">S&P 500</p>
              <p className="text-xs text-gray-400">Market Index</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-red-400">-0.8%</p>
              <p className="text-xs text-gray-400">4,567.89</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
