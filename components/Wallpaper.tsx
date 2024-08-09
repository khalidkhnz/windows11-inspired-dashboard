import Image from "next/image";
import React from "react";
import WALLPAPER from "@/public/GOJO.png";
import WALLPAPER2 from "@/public/wallpaper1.jpg";
type Props = {};

const Wallpaper = (props: Props) => {
  const image =
    "https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fb%2F0%2Fa%2F7%2Fd%2F1%2Fb0a7d15bd407fd30cbfed4863ed23f63a5f6b309.jpg&w=1920&h=1280&q=100";

  return (
    <Image
      className="object-cover"
      alt="wallpaper"
      src={WALLPAPER2 || image || WALLPAPER}
      fill
    />
  );
};

export default Wallpaper;
