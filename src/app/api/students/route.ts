import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '12')
    const skip = (page - 1) * pageSize

    // Get total count for pagination
    const total = await prisma.student.count()

    // Get paginated students
    const students = await prisma.student.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      students,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Check for existing email
    const existingEmail = await prisma.student.findUnique({
      where: { email: body.email },
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Check for existing username
    const existingUsername = await prisma.student.findUnique({
      where: { username: body.username },
    })

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      )
    }

    const student = await prisma.student.create({
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
    console.error('Error creating student:', error)
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
} 