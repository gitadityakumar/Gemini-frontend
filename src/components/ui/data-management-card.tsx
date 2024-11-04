'use client'
import { useState, useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { deleteData } from '@/app/actions/clearData'

export default function DataManagementCard() {
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const actions = [
    { id: 'history', label: 'Delete History' },
    { id: 'apiKeys', label: 'Delete API Keys' },
    { id: 'video', label: 'Delete Processed Video' },
  ]

  const handleDelete = async (id: string) => {
    setOpenDialog(null);
    startTransition(async () => {
      try {
        const response = await deleteData(id);
        
        if (response.success) {
          toast({
            title: "Success",
            description: response.message || `Successfully deleted ${id.toLowerCase()}`,
            variant: "default",
          });
        } else {
          toast({
            title: "Operation Failed",
            description: response.message || `Failed to delete ${id.toLowerCase()}`,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error 
            ? error.message 
            : `Failed to delete ${id.toLowerCase()}. Please try again later.`,
          variant: "destructive",
        });
      }
    });
  };

  const getActionDescription = (id: string) => {
    switch(id) {
      case 'history':
        return "This will permanently delete all your chat history.";
      case 'apiKeys':
        return "This will remove all stored API keys. You'll need to re-enter them to use the services.";
      case 'video':
        return "This will delete all processed video data from storage.";
      default:
        return "This action cannot be undone.";
    }
  };

  return (
    <div className="w-full h-auto my-8 rounded-lg">
      <Card className="w-full h-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
        <CardContent className="px-6">
          <div className="overflow-hidden rounded-lg">
            <table className="w-full">
              <tbody>
                {actions.map((action, index) => (
                  <tr 
                    key={action.id}
                    className={`
                      group transition-all duration-300 
                      hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10
                      dark:hover:from-purple-400/10 dark:hover:to-pink-400/10
                      ${index === 0 ? 'rounded-t-lg' : ''}
                      ${index === actions.length - 1 ? 'rounded-b-lg' : ''}
                    `}
                  >
                    <td className="p-4 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                          {action.label}
                        </span>
                        <Dialog 
                          open={openDialog === action.id} 
                          onOpenChange={(open) => setOpenDialog(open ? action.id : null)}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-zinc-600 dark:text-zinc-400 
                                group-hover:text-zinc-900 dark:group-hover:text-white 
                                hover:bg-purple-100 dark:hover:bg-purple-500/20 
                                rounded-full p-2 transition-colors"
                              aria-label={`Delete ${action.label}`}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white dark:bg-zinc-900 border dark:border-zinc-800">
                            <DialogHeader>
                              <DialogTitle className="text-zinc-800 dark:text-zinc-100">
                                Confirm Deletion
                              </DialogTitle>
                              <DialogDescription className="text-zinc-600 dark:text-zinc-400">
                                {getActionDescription(action.id)}
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => handleDelete(action.id)}
                                className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white"
                              >
                                Delete
                              </Button>
                              <DialogClose asChild>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  className="text-zinc-600 dark:text-zinc-400 
                                    border-zinc-200 dark:border-zinc-700
                                    hover:bg-zinc-100 dark:hover:bg-zinc-800
                                    hover:text-zinc-900 dark:hover:text-zinc-100"
                                >
                                  Cancel
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}