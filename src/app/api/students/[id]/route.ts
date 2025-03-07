import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    console.log('Received update request body:', body)

    const student = await prisma.student.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        email: body.email,
        username: body.username,
        password: body.password,
        fathername: body.fathername,
        grade: body.grade,
        status: body.status,
      },
    })

    return NextResponse.json(student)
  } catch (error) {
    console.error('Error updating student:', error)
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    )
  }
} 