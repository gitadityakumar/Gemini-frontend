"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const defaultVideo = {
  channelName: "TheLallantop",
  channelAvatar: "https://yt3.ggpht.com/4tpv3CE1alB7ayIk-y1ktHsang1dMJkGf4f4dazy55G8j8Y0nGkEYnxNJ30JYOiPf6cCaaMARQ=s88-c-k-c0x00ffffff-no-rj",
  duration: "10:11",
  playtime: 100.150728,
  thumbnailUrl: "https://img.youtube.com/vi/R_1Z-3amyzE/hqdefault.jpg",
  title: "बदल गया आरक्षण? SC ST reservation को CJI Chandrachud का फैसला बदलेगा ! Supreme Court | Creamy Layer",
  url: "https://www.youtube.com/watch?v=R_1Z-3amyzE"
};

export default function CardDemo({ video = defaultVideo }) {
  const {
    channelName,
    channelAvatar,
    duration,
    playtime,
    thumbnailUrl,
    title,
    url
  } = video;

  // Calculate progress percentage
  const totalSeconds = duration.split(':').reduce((acc, time) => (60 * acc) + parseInt(time, 10), 0);
  const progressPercentage = totalSeconds > 0 ? (playtime / totalSeconds) * 100 : 0;

  // Function to get higher quality thumbnail
  // @ts-ignore

  const getHighQualityThumbnail = (url) => url.replace('hqdefault', 'maxresdefault');

  return (
    <div className="max-w-xs w-full group/card mt-2">
      <div className={cn(
        "cursor-pointer overflow-hidden relative card h-auto rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4",
        "bg-white transition-transform duration-300 ease-in-out transform group-hover/card:scale-105"
      )}>
        {/* Channel info */}
        <div className="flex flex-row items-center space-x-4 z-10 mb-4">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={channelAvatar}
              alt={channelName}
              width={40}
              height={40}
            />
          </div>
          <Link href={url} className="flex flex-col hover:underline">
            <p className="font-normal text-base text-gray-800 relative z-10">
              {channelName}
            </p>
          </Link>
        </div>

        {/* Thumbnail image */}
        <div className="relative mb-4">
          <Image
            src={getHighQualityThumbnail(thumbnailUrl)}
            alt={title}
            width={320}
            height={180}
            className="rounded-md"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        </div>

        {/* Video title */}
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-800 relative z-10 line-clamp-2 transition-transform duration-300 group-hover/card:translate-y-[-4px]">
            {title}
          </h1>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
          <div 
            className="h-full bg-red-600" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Check button */}
        <div className="absolute top-2 right-2 z-20">
          <CheckCircle className="text-gray-600 opacity-30 hover:opacity-100 transition-opacity" size={24} />
        </div>
      </div>
    </div>
  );
}