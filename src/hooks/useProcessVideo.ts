import { activeServiceState, modeState,apiKeyDataState } from "@/app/recoilContextProvider";
import { Video } from "@/types/video";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useUser } from "@clerk/nextjs";
import { checkDailyQuota, incrementQuotaCount } from "@/lib/checkQuota";

require("dotenv").config();

const uri = process.env.NEXT_PUBLIC_SECONDRY_BACKEND_URL;

export const useProcessVideo = (token: string | null) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [hookError, setHookError] = useState<string | null>(null);
  const [mode] = useRecoilState(modeState);
  const [model] = useRecoilState(activeServiceState);
  const { user } = useUser();
  const [key] = useRecoilState(apiKeyDataState);
  const data = new Date();
  const processVideo = async (selectedVideos: Video[]) => {
    if (!selectedVideos) return;

    setIsProcessing(true);
    setHookError(null);

    try {
      // Check quota only if mode is public
      const canProceed = await checkDailyQuota(user?.id as string);

      if (!canProceed) {
      setHookError("Daily limit exceeded!")
      setIsProcessing(false);
      return;
      }

     
      const response = await fetch(`${uri}/api/v1/processVideo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoData: selectedVideos,
          usage: mode,
          model: model,
          apikey:key
        }),
      });

      if (response.ok) {
        const { jobId } = await response.json();
        pollProgress(jobId);
        incrementQuotaCount(user?.id as string,  new Date().toISOString().split('T')[0])
      } else {
        setHookError("Failed to process video");
        console.error("Failed to process video");
        setIsProcessing(false);
      }
    } catch (error) {
      setHookError("Error processing video");
      console.error("Error processing video:", error);
      setIsProcessing(false);
    }
  };

  const pollProgress = (jobId: string) => {
    const intervalId = setInterval(async () => {
      try {
        const progressResponse = await fetch(
          `${uri}/api/v1/jobStatus/${jobId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (progressResponse.ok) {
          const { progress } = await progressResponse.json();
          setProgress(progress);

          if (progress >= 100) {
            clearInterval(intervalId);
            setIsProcessing(false);
          }
        } else {
          const message = await progressResponse.json();
          setHookError(`Failed to fetch job status: ${message.error}`);
          clearInterval(intervalId);
          setIsProcessing(false);
        }
      } catch (error) {
        setHookError("Error fetching progress");
        console.error("Error fetching progress:", error);
        clearInterval(intervalId);
        setIsProcessing(false);
      }
    }, 2000);
  };

  return { isProcessing, progress, processVideo, hookError };
};
