"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/utils/translations";
import { AddStudentDialog } from "@/components/students/AddStudentDialog";

interface Student {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  fathername: string;
  grade: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.details || data.error || "Failed to fetch students"
        );
      }

      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching students"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {t("pages.students.title", language)}
        </h1>
        <div className="flex gap-4">
          <Input
            placeholder={t("pages.students.searchPlaceholder", language)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <AddStudentDialog onStudentAdded={fetchStudents} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {t("pages.students.columns.name", language)}
              </TableHead>
              <TableHead>
                {t("pages.students.columns.email", language)}
              </TableHead>
              <TableHead>
                {t("pages.students.columns.username", language)}
              </TableHead>
              <TableHead>
                {t("pages.students.columns.password", language)}
              </TableHead>
              <TableHead>
                {t("pages.students.columns.fathername", language)}
              </TableHead>
              <TableHead>
                {t("pages.students.columns.grade", language)}
              </TableHead>
              <TableHead>
                {t("pages.students.columns.status", language)}
              </TableHead>
              <TableHead className="text-right">
                {t("pages.students.columns.actions", language)}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.username}</TableCell>
                <TableCell>{student.password}</TableCell>
                <TableCell>{student.fathername}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      student.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {t(`pages.students.status.${student.status}`, language)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    {t("pages.students.actions.edit", language)}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
