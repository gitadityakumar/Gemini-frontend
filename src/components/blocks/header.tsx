"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { IconBrandNotion, IconDeviceFloppy } from '@tabler/icons-react'
import { useToast } from "@/hooks/use-toast"
import axios from 'axios'
import { usePathname, useSearchParams } from 'next/navigation'

interface HeaderProps {
  title?: string;
  content: string;
}

export default function Header({ title = "Title", content }: HeaderProps) {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [hasNotionToken, setHasNotionToken] = useState(false);  // Token state
  const searchParams = useSearchParams();
  const formattedTitle = title.split(" ").slice(0, 5).join(" ") + "...";
  const pathname = usePathname();

  // Check for the presence of the token in cookies
  const checkNotionToken = () => {
    const tokenFromCookie = document.cookie.split('; ').find(row => row.startsWith('notion_token='));
    setHasNotionToken(!!tokenFromCookie);  // Set token state if found
  };

  useEffect(() => {
    // Function to check if the Notion token is stored in cookies
    const checkNotionToken = () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('notion_token='));
      setHasNotionToken(!!token);
      console.log(token);
    };
  
    // Run this check after the component mounts (initial load or redirect)
    checkNotionToken();
  
    // Check for successful authentication in URL
    const authSuccess = searchParams.get('notion_auth_success');
    if (authSuccess === 'true') {
      toast({
        title: "Success",
        description: "Successfully connected to Notion!",
      });
    }
  
    // Optionally, listen for storage changes (not necessary in this case)
    window.addEventListener('storage', checkNotionToken);
    return () => window.removeEventListener('storage', checkNotionToken);
  }, [searchParams, toast]);
  
  
  const initiateNotionOAuth = async () => {
    try {
      const currentPageUrl = encodeURIComponent(`${window.location.origin}${pathname}`);
      const response = await fetch(`/api/notionauth?returnUrl=${currentPageUrl}`);
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;  // Redirect to Notion auth page
      } else {
        throw new Error('No authorization URL received');
      }
    } catch (error) {
      console.error('Error starting Notion authentication:', error);
      toast({
        title: "Error",
        description: "Failed to start Notion authentication. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExport = async () => {
    if (!hasNotionToken) {
      initiateNotionOAuth();  // If no token, start OAuth flow
      return;
    }

    setIsExporting(true);
    try {
      await axios.post('/api/notionexport', { content, title });
      toast({
        title: "Success 👍",
        description: "Export to Notion was successful!",
      });
    } catch (error) {
      console.error('Error exporting to Notion:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setHasNotionToken(false);  // If 401, token might be invalid
        toast({
          title: "Authentication Error",
          description: "Please reconnect your Notion account.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error 😞",
          description: "Failed to export to Notion. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">{formattedTitle}</h1>
        <div className="space-x-2">
          <Button 
            variant="default" 
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
          >
            <IconBrandNotion className="w-4 h-4 mr-2" stroke={1.5} />
            {isExporting ? 'Exporting...' : (hasNotionToken ? 'Export ' : 'Connect to Notion')}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              toast({
                title: "Success 👍",
                description: "Saved successfully!",
              })
            }}
          >
            <IconDeviceFloppy className="w-4 h-4 mr-2" stroke={1.5} />
            Save
          </Button>
        </div>
      </div>
    </header>
  )
}
