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

type DeleteInsightButtonProps = {
  slug: string
  title: string
  deleteAction: (formData: FormData) => Promise<void>
}

export function DeleteInsightButton({ slug, title, deleteAction }: DeleteInsightButtonProps) {
  const formId = `delete-insight-${slug}`

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="rounded-md border border-red-300 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50" type="button">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this insight?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove <strong>{title}</strong>. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={deleteAction} id={formId}>
          <input name="slug" type="hidden" value={slug} />
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <button className="bg-red-600 text-white hover:bg-red-700" form={formId} type="submit">
              Yes, Delete
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

