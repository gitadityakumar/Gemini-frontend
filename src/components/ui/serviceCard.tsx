import { storeApiKey } from "@/app/actions/apiKeyActions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Switch } from "@/components/ui/switch";
import { Input } from "./input";
import { Button } from "./button";

interface ServiceCardProps {
  title: string;
  description: string;
  isActive: boolean;
  onToggle: () => void;
}

export function ServiceCard({ title, description, isActive, onToggle }: ServiceCardProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const result = await storeApiKey(title.toLowerCase(), apiKey);
      if (result.success) {
        toast({
          title: "Success",
          description: `API key for ${title} saved successfully.`,
        });
        setApiKey("");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to save API key for ${title}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 from-5% via-purple-600 via-40% to-pink-400 to-80%">
            {title}
          </CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">
            {description}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div 
              className={`w-3 h-3 rounded-full ${
                isActive 
                  ? 'bg-green-500 dark:bg-green-400' 
                  : 'bg-zinc-300 dark:bg-zinc-600'
              } transition-colors duration-200`} 
            />
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <Switch 
            checked={isActive} 
            onCheckedChange={onToggle}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <Input
          type="text"
          placeholder={isActive ? "Api key found" : "Please enter your Api key if you haven't"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          disabled={isActive}
          className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
        />
        <Button 
          onClick={handleSave} 
          className="w-full bg-gradient-to-r from-blue-400 via-purple-600 to-pink-400 hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={isActive}
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
}