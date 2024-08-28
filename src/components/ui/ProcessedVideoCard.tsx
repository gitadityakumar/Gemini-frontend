import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    <Link href={`/processed/${video.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="relative">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={100}
            height={100}
            layout="responsive"
            className="object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 truncate">{video.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Processed on: {new Date(video.processingDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};