"use client"
import React, { useState } from 'react'
import CardDemo from '@/components/blocks/cards-demo-2'
import PageHeader from '@/components/ui/pageheader'
import { defaultVideo } from '@/data/data'

const Page = () => {
 
  const videoCount = 8; 
   const [selectedVideos, setSelectedVideos] = useState(new Set());

    // @ts-ignore
   const handleVideoSelect = (videoId) => {
    setSelectedVideos(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(videoId)) {
        newSelected.delete(videoId);
      } else {
        newSelected.add(videoId);
      }
      return newSelected;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-100 dark:bg-neutral-800">
      <div className="flex-shrink-0 m-4 mt-6 rounded-tl-2xl rounded-tr-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        <PageHeader userName={"Aditya kumar"}/>
      </div>
      
      <div className="flex-grow overflow-auto m-4 mt-0">
        <div className="md:p-10 rounded-bl-2xl rounded-br-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 min-h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: videoCount }).map((_, index) => (
              <CardDemo  key={index} 
              video={{ ...defaultVideo, id: String(index) }}
              isSelected={selectedVideos.has(String(index))}
              onSelect={handleVideoSelect}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page