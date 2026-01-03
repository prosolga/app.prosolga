// app/api/submit-contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'public', 'submissions.json')

// Initialize file if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Read existing submissions
    const raw = fs.readFileSync(filePath, 'utf-8')
    const submissions = JSON.parse(raw)

    // Add new submission with timestamp
    submissions.push({
      ...data,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString(),
    })

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2))

    return NextResponse.json({ success: true, message: 'Thank you! We\'ll contact you soon.' })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to save' }, { status: 500 })
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const filePath = path.join(process.cwd(), 'public', 'submissions.json')
    
    const raw = fs.readFileSync(filePath, 'utf-8')
    let submissions = JSON.parse(raw)

    submissions = submissions.filter((s: any) => s.id !== id)

    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const submissions = JSON.parse(raw)
    return NextResponse.json(submissions)
  } catch (error) {
    return NextResponse.json([])
  }
}