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
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 from-5% via-purple-600 via-40% to-pink-400 to to-80%">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-200`} />
            <span className="text-sm">{isActive ? 'Active' : 'Inactive'}</span>
          </div>
          <Switch checked={isActive} onCheckedChange={onToggle} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <Input
          type="text"
          placeholder={isActive ? "Api key found" : "Please  enter your Api key if you haven't"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          disabled={isActive}  // Disable input if the service is inactive
        />
        <Button onClick={handleSave} className="w-full" disabled={isActive}>
          Save
        </Button>
      </CardContent>
    </Card>
  );
}
