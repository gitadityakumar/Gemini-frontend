import { connectToDatabase } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    
    const videos = await db
      .collection('videoData')
      .find({ processed: false })
      .toArray()

    return NextResponse.json(videos, { status: 200 })
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json({ error: 'Error fetching videos' }, { status: 500 })
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'GET'
    }
  })
}

export async function POST(req: NextRequest) {
  return methodNotAllowed(req)
}

export async function PUT(req: NextRequest) {
  return methodNotAllowed(req)
}

export async function DELETE(req: NextRequest) {
  return methodNotAllowed(req)
}

function methodNotAllowed(req: NextRequest) {
  return new NextResponse(`Method ${req.method} Not Allowed`, { status: 405 })
}