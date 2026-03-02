"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type ToggleInsightButtonProps = {
  slug: string
  title: string
  enabled: boolean
  onToggle: (slug: string, enabled: boolean) => Promise<void>
}

export function ToggleInsightButton({ slug, title, enabled, onToggle }: ToggleInsightButtonProps) {
  const nextEnabled = !enabled

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="rounded-md border px-3 py-1 text-xs font-medium hover:bg-muted" type="button">
          {enabled ? "Disable" : "Enable"}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{enabled ? "Disable this insight?" : "Enable this insight?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {enabled
              ? `This will hide "${title}" from public insights pages.`
              : `This will make "${title}" visible on public insights pages.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onToggle(slug, nextEnabled)}>
            {enabled ? "Yes, Disable" : "Yes, Enable"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

