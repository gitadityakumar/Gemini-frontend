import { Video } from '@/types/processedVideoTypes';
import mockVideoData from '@/data/data';
import { formatMonthYear } from '@/lib/dateFormatting';

export async function getProcessedVideos(): Promise<Video[]> {
  // In a real application, this would fetch data from an API
  // For now, we'll return mock data
  return mockVideoData;
}

export async function getVideoDetails(id: string): Promise<Video | null> {
  const videos = await getProcessedVideos();
  return videos.find(video => video.id === id) || null;
}

export function groupVideosByMonth(videos: Video[]): Record<string, Video[]> {
  return videos.reduce((acc, video) => {
    const monthYear = formatMonthYear(video.processingDate);
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(video);
    
    return acc;
  }, {} as Record<string, Video[]>);
}

// Add more utility functions as needed