"use client"
import React, { useState, useEffect } from 'react'
import CardDemo from '@/components/blocks/cards-demo-2'
import PageHeader from '@/components/ui/pageheader'
import { Video, ApiResponse } from '@/types/video'
import { toast } from '@/hooks/use-toast'
import { Toaster } from "@/components/ui/toaster"
import { ToastAction } from '@/components/ui/toast'


const Page = () => {

  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideos, setSelectedVideos] = useState(new Map<string, Video>());
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasExtension, setHasExtension] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/db');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data: ApiResponse = await response.json();
        
        if (data.videos) {
          setVideos(data.videos);
          setHasExtension(true);
        } else if (data.message === "No data found") {
          setVideos([]);
          setHasExtension(data.hasExtension ?? false);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideos(prevSelected => {
      const newSelected = new Map(prevSelected);
      const video = videos.find(v => v._id.$oid === videoId);
      if (newSelected.has(videoId)) {
        newSelected.delete(videoId);
      } else if (video) {
        newSelected.set(videoId, video);
      }
      return newSelected;
    });
  };

  const handleProcess = () => {
    if(Array.from(selectedVideos.values()).length==0){
      // alert("Please select at least one video to process");
      toast({
        title: "Uh oh! 😳",
        description: `Please select at least one video to process`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return;
    }
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

    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-neutral-200 dark:bg-neutral-700 rounded-lg p-4 animate-pulse">
              <div className="h-40 bg-neutral-300 dark:bg-neutral-600 rounded-md mb-4"></div>
              <div className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      );
    }

    if (videos.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">No Videos Available</p>
            {hasExtension === false ? (
              <p className="text-gray-600 dark:text-gray-400">
                Please download our extension from the store to start collecting data.
              </p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                You haven&#39;t processed any videos yet. Start using our extension to collect data!
              </p>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {videos.map((video) => (
          <CardDemo
            key={video._id.$oid}
            video={video}
            // isSelected={(video._id.$oid)}
            onSelect={handleVideoSelect}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-white h-full w-full overflow-x-hidden">
      <div className="flex-shrink-0 p-4">
        <PageHeader
          onProcess={handleProcess}
          isProcessing={isProcessing}
        />
      </div>
      
      <div className="flex-grow overflow-auto ">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 min-h-full">
          {renderContent()}
        </div>
      </div>
      <Toaster/>
    </div>
  )
}

export default Page