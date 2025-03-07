import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: ids array is required" },
        { status: 400 }
      );
    }

    await prisma.student.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ message: "Students deleted successfully" });
  } catch (error) {
    console.error("Error deleting students:", error);
    return NextResponse.json(
      { error: "Failed to delete students" },
      { status: 500 }
    );
  }
} 