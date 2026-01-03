// app/admin/submissions/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Download } from "lucide-react"
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
import { toast } from "sonner"

async function getSubmissions() {
  // This works perfectly in production and development
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/submit-contact`
  
  const res = await fetch(url, { 
    cache: 'no-store',
    // Optional: add a small timeout
    // next: { revalidate: 0 }
  })
  
  if (!res.ok) return []
  return res.json()
}

async function deleteSubmission(id: string) {
  const res = await fetch('/api/submit-contact', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })

  if (res.ok) {
    toast.success("Submission deleted successfully")
    // Force refresh data
    window.location.reload()
  } else {
    toast.error("Failed to delete submission")
  }
}

function exportToCSV(submissions: any[]) {
  if (submissions.length === 0) {
    toast.info("No data to export")
    return
  }

  const headers = [
    "ID",
    "Submitted At",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Service Interest",
    "Message",
  ]

  const rows = submissions.map(s => {
    // Properly capitalize service name (e.g. "real-estate" → "Real Estate")
    const formattedService = s.service
      ? s.service
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (letter: string) => letter.toUpperCase())
      : ''

    return [
      s.id,
      new Date(s.submittedAt).toLocaleString(),
      s.firstName || '',
      s.lastName || '',
      s.email || '',
      s.phone || '',
      formattedService,
      `"${(s.message || '').replace(/"/g, '""')}"`, // CSV-safe quoting
    ]
  })

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `contact-submissions-${new Date().toISOString().slice(0, 10)}.csv`
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  toast.success("CSV exported successfully!")
}

export default async function SubmissionsPage() {
  const submissions = await getSubmissions()

  return (
    <div className="container mx-auto py-10 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Form Submissions ({submissions.length})</h1>

        <Button
          onClick={() => exportToCSV(submissions)}
          className="gap-2"
          size="lg"
        >
          <Download className="w-5 h-5" />
          Export as CSV
        </Button>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-lg text-muted-foreground">No submissions yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {submissions.reverse().map((s: any) => (
            <Card key={s.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">
                      {s.firstName} {s.lastName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(s.submittedAt).toLocaleString()} •{' '}
                      <span className="capitalize">
                        {s.service.replace(/-/g, ' ')}
                      </span>
                    </p>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this submission?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the contact form submission from {s.firstName} {s.lastName}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteSubmission(s.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete Permanently
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>

              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{s.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{s.phone || '—'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-muted-foreground mb-2">Message</p>
                  <p className="bg-muted p-4 rounded-lg whitespace-pre-wrap">{s.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}