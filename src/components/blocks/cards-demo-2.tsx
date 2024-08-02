"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CheckCircle, Clock } from 'lucide-react';

const defaultVideo = {
  channelName: "TheLallantop",
  duration: "10:11",
  playtime: 100.150728,
  thumbnailUrl: "https://img.youtube.com/vi/R_1Z-3amyzE/hqdefault.jpg",
  title: "बदल गया आरक्षण? SC ST reservation को CJI Chandrachud का फैसला बदलेगा ! Supreme Court | Creamy Layer",
  url: "https://www.youtube.com/watch?v=R_1Z-3amyzE"
};

export default function CardDemo({ video = defaultVideo }) {
  const {
    channelName,
    duration,
    playtime,
    thumbnailUrl,
    title,
    url
  } = video;

  // Calculate progress percentage
  const totalSeconds = duration.split(':').reduce((acc, time) => {
    return (60 * acc) + parseInt(time, 10);
  }, 0);
  const progressPercentage = totalSeconds > 0 ? (playtime / totalSeconds) * 100 : 0;

  // Function to get higher quality thumbnail
  // @ts-ignore
  const getHighQualityThumbnail = (url) => {
    return url.replace('hqdefault', 'maxresdefault');
  };

  return (
    <div className="max-w-xs w-full group/card mt-2">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4",
          "bg-cover bg-center transition-transform duration-300 ease-in-out transform group-hover/card:scale-105"
        )}
        style={{ backgroundImage: `url(${getHighQualityThumbnail(thumbnailUrl)})` }}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40 transition-opacity duration-300 group-hover/card:opacity-50"></div>
        
        {/* Channel info */}
        <div className="flex flex-row items-center space-x-4 z-10">
          <div className="h-10 w-10 rounded-full border-2 bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
            {channelName[0]}
          </div>
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              {channelName}
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <Clock size={14} className="mr-1" />
              {duration}
            </div>
          </div>
        </div>

        {/* Video title */}
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10 line-clamp-2 transition-transform duration-300 group-hover/card:translate-y-[-4px]">
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

        {/* Video length */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>

        {/* Check button */}
        <div className="absolute top-2 right-2 z-20">
          <CheckCircle className="text-white opacity-30 hover:opacity-100 transition-opacity" size={24} />
        </div>
      </div>
    </div>
  );
}