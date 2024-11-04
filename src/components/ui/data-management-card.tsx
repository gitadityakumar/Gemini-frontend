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
      <Card className="w-full h-full">
        <CardContent className="px-6 ">
          <div className="overflow-hidden rounded-lg">
            <table className="w-full">
              <tbody>
                {actions.map((action, index) => (
                  <tr 
                    key={action.id}
                    className={`
                      group transition-all duration-200 hover:bg-gradient-to-r from-black to-white/15
                      ${index === 0 ? 'rounded-t-lg' : ''}
                      ${index === actions.length - 1 ? 'rounded-b-lg' : ''}
                    `}
                  >
                    <td className="p-4 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-gray-700 group-hover:text-white transition-colors">
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
                              className="text-gray-600 group-hover:text-white hover:bg-purple-700 rounded-full p-2 transition-colors"
                              aria-label={`Delete ${action.label}`}
                            >
                              <Trash2 className="h-5 w-5 "  />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle className="text-gray-800">Confirm Deletion</DialogTitle>
                              <DialogDescription className="text-gray-600">
                              {getActionDescription(action.id)}
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => handleDelete(action.id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Delete
                              </Button>
                              <DialogClose asChild>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  className="text-gray-600 hover:bg-gray-100"
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