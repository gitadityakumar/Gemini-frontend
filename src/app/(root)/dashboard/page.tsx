"use client";
import React, { useState, useEffect } from "react";
import CardDemo from "@/components/blocks/cards-demo-2";
import PageHeader from "@/components/ui/pageheader";
import { Video, ApiResponse } from "@/types/video";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useProcessVideo } from "@/hooks/useProcessVideo"; 
import { ToastAction } from "@radix-ui/react-toast";

const Page = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasExtension, setHasExtension] = useState<boolean | null>(null);

  // Token can be fetched from your auth context
  const token = "<your_token_here>"; 
  
  // Process the selected videos
  const { isProcessing, progress, processVideo } = useProcessVideo( 
    token
  );

  // Fetch videos from the backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/db");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data: ApiResponse = await response.json();

        if (data.videos) {
          setVideos(data.videos);
          setHasExtension(true);
        } else if (data.message === "No data found") {
          setVideos([]);
          setHasExtension(data.hasExtension ?? false);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Handle video selection
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(prevSelected => {
      const newSelected = prevSelected === videoId ? null : videoId;
      return newSelected;
    });
  };
  

  // Trigger the video processing
 const handleProcess = () => {
    if (!selectedVideoId) {
      toast({
        title: "Uh oh! 😳",
        description: `Please select a video to process`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    const selectedVideo = videos.find(video => video._id === selectedVideoId);
    if (selectedVideo) {
      processVideo([selectedVideo]);
    } else {
      console.error("Selected video not found in videos array");
    }
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
            <div
              key={index}
              className="bg-neutral-200 dark:bg-neutral-700 rounded-lg p-4 animate-pulse"
            >
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
          key={video._id }
          video={video}
          onSelect={handleVideoSelect}
          isSelected={selectedVideoId === video._id}
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
      <Toaster />
    </div>
  );
};

export default Page;
