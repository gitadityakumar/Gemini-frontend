"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRecoilState } from "recoil";
import {
  modeState,
  activeServiceState,
  apiKeyDataState,
} from "@/app/recoilContextProvider";
import { getApiKey } from "@/app/actions/apiKeyActions";
import { ServiceCard } from "@/components/ui/serviceCard";
import DataManagementCard from "@/components/ui/data-management-card";
import { ModeToggle } from "@/components/ui/themeMode";

type ServiceType = "gemini" | "graq" | null;

export default function SettingsPage() {
  const [activeService, setActiveService] =
    useRecoilState<ServiceType>(activeServiceState);
  const [mode, setMode] = useRecoilState(modeState);
  const [apikey, setApiKey] = useRecoilState(apiKeyDataState);
  const { toast } = useToast();

  const toggleService = async (service: ServiceType) => {
    if (activeService === service) {
      setActiveService(null);
      setMode("public");
    } else if (activeService === null) {
      // Fetch the API key when toggling
      const result = await getApiKey(service!);
      //  console.log(result.apiKey)
      setApiKey(result.apiKey!);
      if (result.success && result.apiKey) {
        setActiveService(service);
        setMode("private");
        toast({
          title: "API Key Found",
          description: `API key is present for ${service}`,
          variant: "default",
        });
      } else {
        toast({
          title: "Missing API Key",
          description: `Please add an API key for ${service} .`,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error 😐",
        description: `Please deactivate ${activeService} before activating ${service}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen bg-slate-50 dark:bg-zinc-950 p-8 transition-colors">
        <header className="mb-8 flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-300 dark:to-pink-500">
            Settings
          </h1>
          <div>
            <ModeToggle />
          </div>
        </header>
        <div className="grid gap-8 md:grid-cols-2 transition-colors">
          <ServiceCard
            title="Gemini"
            description="Activate Gemini service"
            isActive={activeService === "gemini"}
            onToggle={() => toggleService("gemini")}
          />
          <ServiceCard
            title="Graq"
            description="Activate Graq service"
            isActive={activeService === "graq"}
            onToggle={() => toggleService("graq")}
          />
        </div>
        <Toaster />
        <DataManagementCard />
      </div>
    </>
  );
}
