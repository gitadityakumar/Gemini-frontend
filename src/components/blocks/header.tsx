import { Button } from "@/components/ui/button"
import { IconBrandNotion, IconDeviceFloppy
} from '@tabler/icons-react'

export default function Header({ title = "Title" }: { title?: string }) {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <div className="space-x-2">
          <Button variant="default" size="sm">
            <IconBrandNotion className="w-4 h-4 mr-2" stroke={1.5} />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <IconDeviceFloppy className="w-4 h-4 mr-2" stroke={1.5} />
            Save
          </Button>
        </div>
      </div>
    </header>
  )
}