import Image from "next/image";
import React from "react";
import WALLPAPER from "@/public/GOJO.png";

type Props = {};

const Wallpaper = (props: Props) => {
  return (
    <Image className="object-cover" alt="wallpaper" src={WALLPAPER} fill />
  );
};

export default Wallpaper;
