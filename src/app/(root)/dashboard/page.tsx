"use client"
import React, { useState } from 'react'
import CardDemo from '@/components/blocks/cards-demo-2'
import PageHeader from '@/components/ui/pageheader'
import { defaultVideo } from '@/data/data'

const Page = () => {
  const videoCount = 8;
  const [selectedVideos, setSelectedVideos] = useState(new Map());
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate an array of videos with unique IDs
  const videos = Array.from({ length: videoCount }, (_, index) => ({
    ...defaultVideo,
    id: String(index),
     // Add a unique title for each video
  }));
 // @ts-ignore
  const handleVideoSelect = (video) => {
    setSelectedVideos(prevSelected => {
      const newSelected = new Map(prevSelected);
      if (newSelected.has(video.id)) {
        newSelected.delete(video.id);
      } else {
        newSelected.set(video.id, video);
      }
      return newSelected;
    });
  };

  const handleProcess = () => {
    setIsProcessing(true);
    
    // Log selected videos to console
    console.log("Selected Videos:", Array.from(selectedVideos.values()));

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      console.log("Processing complete");
      
      // Reset selected videos
      setSelectedVideos(new Map());
    }, 2000);
  };

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
                key={video.id} 
                video={video}
                isSelected={selectedVideos.has(video.id)}
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