import { useState } from 'react';

 export const useProcessVideo = (selectedVideo: any, token: string) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  const processVideo = async () => {
    if (!selectedVideo) return;

    setIsProcessing(true);

    try {
      // Send the request to start processing
      const response = await fetch('/api/start-processing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoData: selectedVideo,
          usage: 'public', // Or 'private', based on user selection
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
        const progressResponse = await fetch(`/api/progress/${jobId}`, {
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
