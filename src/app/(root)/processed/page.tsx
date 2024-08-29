import React from 'react';
import { MonthlyVideoGrid } from '@/components/ui/MonthlyVideoGrid';
import { getProcessedVideos } from '@/lib/videoUtils';

export default async function ProcessedPage() {
  // Fetch the videos
  const videos = await getProcessedVideos();

  return (
    <div className="flex flex-col  h-full w-full overflow-hidden">
      <header className="bg-slate-100 dark:bg-slate-800 py-4 flex-shrink-0">
        <div className="container mx-auto px-4">
          <h1 className='text-3xl font-bold text-slate-800 dark:text-slate-200'>
            Processed Videos
          </h1>
        </div>
      </header>
      <main className="flex-grow overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <MonthlyVideoGrid videos={videos} />
        </div>
      </main>
    </div>
  );
}