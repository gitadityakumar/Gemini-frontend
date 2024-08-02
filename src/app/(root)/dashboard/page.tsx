import React from 'react'
import CardDemo from '@/components/blocks/cards-demo-2'
import PageHeader from '@/components/ui/pageheader'

const Page = () => {
  // Simulate having more than 4 videos
  const videoCount = 8; // You can change this to any number

  return (
    <div className="flex flex-col h-screen bg-neutral-100 dark:bg-neutral-800">
      <div className="flex-shrink-0 m-4 mt-6 rounded-tl-2xl rounded-tr-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        <PageHeader userName={"Aditya kumar"} watchHistory={"letsfindout"}/>
      </div>
      
      <div className="flex-grow overflow-auto m-4 mt-0">
        <div className="md:p-10 rounded-bl-2xl rounded-br-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 min-h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: videoCount }).map((_, index) => (
              <CardDemo key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page