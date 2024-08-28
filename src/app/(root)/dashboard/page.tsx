"use client"

import React, { useState, useEffect } from 'react'
import CardDemo from '@/components/blocks/cards-demo-2'
import PageHeader from '@/components/ui/pageheader'

interface Video {
  _id: { $oid: string };
  userId: string;
  url: string;
  channelAvatar: string;
  channelName: string;
  duration: string;
  lastUpdated: { $date: string };
  playtime: number;
  processed: boolean;
  thumbnailUrl: string;
  title: string;
}

const Page = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideos, setSelectedVideos] = useState(new Map<string, Video>());
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/db');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideos(prevSelected => {
      const newSelected = new Map(prevSelected);
      if (newSelected.has(video._id.$oid)) {
        newSelected.delete(video._id.$oid);
      } else {
        newSelected.set(video._id.$oid, video);
      }
      return newSelected;
    });
  };

  const handleProcess = () => {
    setIsProcessing(true);
    
    console.log("Selected Videos:", Array.from(selectedVideos.values()));
    
    setTimeout(() => {
      setIsProcessing(false);
      console.log("Processing complete");
      
      setSelectedVideos(new Map());
    }, 2000);
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-red-500 text-center">
            <p className="text-xl font-semibold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-neutral-200 dark:bg-neutral-700 rounded-lg p-4 animate-pulse">
                <div className="h-40 bg-neutral-300 dark:bg-neutral-600 rounded-md mb-4"></div>
                <div className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded w-1/2"></div>
              </div>
            ))
          : videos.map((video) => (
              <CardDemo
                key={video._id.$oid}
                video={video}
                isSelected={selectedVideos.has(video._id.$oid)}
                onSelect={() => handleVideoSelect(video)}
              />
            ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-white h-full w-full overflow-hidden">
      <div className="flex-shrink-0 p-4">
        <PageHeader
          onProcess={handleProcess}
          isProcessing={isProcessing}
        />
      </div>
      
      <div className="flex-grow overflow-auto p-4">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 min-h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Page