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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-100 dark:bg-neutral-800">
      <div className="flex-shrink-0 m-4 mt-6 rounded-tl-2xl rounded-tr-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        <PageHeader 
          onProcess={handleProcess} 
          isProcessing={isProcessing}
        />
      </div>
      
      <div className="flex-grow overflow-auto m-4 mt-0">
        <div className="md:p-10 rounded-bl-2xl rounded-br-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 min-h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <CardDemo 
                key={video._id.$oid} 
                video={video}
                isSelected={selectedVideos.has(video._id.$oid)}
                onSelect={() => handleVideoSelect(video)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page