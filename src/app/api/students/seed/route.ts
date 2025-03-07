import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const student = await prisma.student.create({
      data: {
        name: "Test Student",
        email: "test@example.com",
        grade: "10",
        status: "active"
      }
    })
    return NextResponse.json(student)
  } catch (error) {
    console.error('Error creating test student:', error)
    return NextResponse.json(
      { error: 'Failed to create test student', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 