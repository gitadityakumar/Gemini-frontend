import { activeServiceState, modeState } from '@/app/recoilContextProvider';
import { Video } from '@/types/video';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
require('dotenv').config();

const uri = process.env.NEXT_PUBLIC_SECONDRY_BACKEND_URL;
 export const useProcessVideo = ( token: string) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [mode] = useRecoilState(modeState);
  const [model] = useRecoilState(activeServiceState);

  const processVideo = async (selectedVideos: Video[]) => {
    if (!selectedVideos) return;

    setIsProcessing(true);

    try {
      // Send the request to start processing
      const response = await fetch(`${uri}/api/v1/processVideo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoData: selectedVideos,
          usage:mode,
          model:model // Or 'private', based on user selection
        }),
      });

      if (response.ok) {
        const { jobId } = await response.json();

        // Poll the server for job progress
        pollProgress(jobId);
      } else {
        // Handle error
        console.error('Failed to process video');
      }
    } catch (error) {
      console.error('Error processing video:', error);
    }
  };

  const pollProgress = (jobId: string) => {
    const intervalId = setInterval(async () => {
      try {
        const progressResponse = await fetch(`${uri}/api/v1/jobStatus/${jobId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (progressResponse.ok) {
          const { progress } = await progressResponse.json();
          setProgress(progress);

          // If the progress reaches 100%, stop polling
          if (progress >= 100) {
            clearInterval(intervalId);
            setIsProcessing(false);
          }
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    }, 2000); // Poll every 2 seconds
  };

  return { isProcessing, progress, processVideo };
};
