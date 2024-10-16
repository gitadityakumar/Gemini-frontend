import { activeServiceState, modeState } from '@/app/recoilContextProvider';
import { Video } from '@/types/video';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
require('dotenv').config();

const uri = process.env.NEXT_PUBLIC_SECONDRY_BACKEND_URL;

export const useProcessVideo = (token: string | null ) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [hookError, setHookError] = useState<string | null>(null);
  const [mode] = useRecoilState(modeState);
  const [model] = useRecoilState(activeServiceState);

  const processVideo = async (selectedVideos: Video[]) => {
    if (!selectedVideos) return;

    setIsProcessing(true);
    setHookError(null); // Reset hookError before processing

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
          usage: mode,
          model: model, // Or 'private', based on user selection
        }),
      });

      if (response.ok) {
        const { jobId } = await response.json();

        // Poll the server for job progress
        pollProgress(jobId);
      } else {
        // Handle error if the initial process request fails
        setHookError('Failed to process video');
        console.error('Failed to process video');
        setIsProcessing(false); // Stop processing on failure
      }
    } catch (error) {
      setHookError('Error processing video');
      console.error('Error processing video:', error);
      setIsProcessing(false); // Ensure processing stops
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
          const { progress,status,error } = await progressResponse.json();
          setProgress(progress);

          // If the progress reaches 100%, stop polling
              if (progress >= 100) {
                clearInterval(intervalId);
                setIsProcessing(false); // Stop the processing flag when done
              }
        } else {
          // Handle non-OK progress response
          const message = await progressResponse.json();
          setHookError(`Failed to fetch job status: ${message.error} `);
          clearInterval(intervalId); // Stop polling if there's an error
          setIsProcessing(false); // Stop processing on error
        }
      } catch (error) {
        setHookError('Error fetching progress');
        console.error('Error fetching progress:', error);
        clearInterval(intervalId); // Stop polling on fetch failure
        setIsProcessing(false); // Stop processing on error
      }
    }, 2000); // Poll every 2 seconds
  };

  return { isProcessing, progress, processVideo, hookError };
};
