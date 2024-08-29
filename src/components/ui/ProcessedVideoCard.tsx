
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/dateFormatting';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnailUrl: string;
    duration: string;
    processingDate: string;
  }
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link href={`/processed/${video.id}`} className="block w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 h-full">
        <div className="relative aspect-video">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold mb-1 line-clamp-2">{video.title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Processed on: {formatDate(video.processingDate)}
          </p>
        </div>
      </div>
    </Link>
  );
};