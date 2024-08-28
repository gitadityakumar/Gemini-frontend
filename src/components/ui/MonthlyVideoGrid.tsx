"use client"
import React, { useState } from 'react';
import { VideoCard } from '@/components/ui/ProcessedVideoCard';
import { groupVideosByMonth } from '@/lib/videoUtils';
import { Video } from '@/types/processedVideoTypes';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MonthlyVideoGridProps {
  videos: Video[];
}

export const MonthlyVideoGrid: React.FC<MonthlyVideoGridProps> = ({ videos }) => {
  const groupedVideos = groupVideosByMonth(videos);
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({});

  const toggleExpand = (month: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  return (
    <div className="space-y-12">
      {Object.entries(groupedVideos).map(([month, monthVideos]) => {
        const isExpanded = expandedMonths[month] || false;
        const displayedVideos = isExpanded ? monthVideos : monthVideos.slice(0, 3);
        const hasMoreVideos = monthVideos.length > 3;

        return (
          <div key={month}>
            <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300">{month}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
            {hasMoreVideos && (
              <button 
                onClick={() => toggleExpand(month)}
                className="mt-4 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="mr-2" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2" />
                    Show {monthVideos.length - 3} more
                  </>
                )}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};