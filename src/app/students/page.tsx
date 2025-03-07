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
import { EditStudentDialog } from "@/components/students/EditStudentDialog";
import * as XLSX from "xlsx";

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

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const { language } = useLanguage();

  const fetchStudents = async (page: number = 1) => {
    try {
      const response = await fetch(
        `/api/students?page=${page}&pageSize=${pageSize}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.details || data.error || "Failed to fetch students"
        );
      }

      setStudents(data.students);
      setPagination(data.pagination);
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
    fetchStudents(currentPage);
  }, [currentPage, pageSize]);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setSelectedStudent(null);
    fetchStudents(currentPage);
  };

  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredStudents.map((student) => ({
      [t("pages.students.columns.name", language)]: student.name,
      [t("pages.students.columns.email", language)]: student.email,
      [t("pages.students.columns.username", language)]: student.username,
      [t("pages.students.columns.password", language)]: student.password,
      [t("pages.students.columns.fathername", language)]: student.fathername,
      [t("pages.students.columns.grade", language)]: student.grade,
      [t("pages.students.columns.status", language)]: t(
        `pages.students.status.${student.status}`,
        language
      ),
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, t("pages.students.title", language));

    // Generate Excel file
    XLSX.writeFile(
      wb,
      `${t("pages.students.title", language)}_${
        new Date().toISOString().split("T")[0]
      }.xlsx`
    );
  };

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
          <Button
            variant="outline"
            onClick={handleExport}
            className="whitespace-nowrap"
          >
            {t("pages.students.actions.export", language)}
          </Button>
          <AddStudentDialog onStudentAdded={() => fetchStudents(currentPage)} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right rtl:text-right ltr:text-left">
                {t("pages.students.columns.name", language)}
              </TableHead>
              <TableHead className="text-right rtl:text-right ltr:text-left">
                {t("pages.students.columns.email", language)}
              </TableHead>
              <TableHead className="text-right rtl:text-right ltr:text-left">
                {t("pages.students.columns.username", language)}
              </TableHead>
              <TableHead className="text-right rtl:text-right ltr:text-left">
                {t("pages.students.columns.password", language)}
              </TableHead>
              <TableHead className="text-right rtl:text-right ltr:text-left">
                {t("pages.students.columns.fathername", language)}
              </TableHead>
              <TableHead className="text-right rtl:text-right ltr:text-left">
                {t("pages.students.columns.grade", language)}
              </TableHead>
              <TableHead className="text-right rtl:text-right ltr:text-left">
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
                <TableCell className="text-right rtl:text-right ltr:text-left">
                  {student.name}
                </TableCell>
                <TableCell className="text-right rtl:text-right ltr:text-left">
                  {student.email}
                </TableCell>
                <TableCell className="text-right rtl:text-right ltr:text-left">
                  {student.username}
                </TableCell>
                <TableCell className="text-right rtl:text-right ltr:text-left">
                  {student.password}
                </TableCell>
                <TableCell className="text-right rtl:text-right ltr:text-left">
                  {student.fathername}
                </TableCell>
                <TableCell className="text-right rtl:text-right ltr:text-left">
                  {student.grade}
                </TableCell>
                <TableCell className="text-right rtl:text-right ltr:text-left">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(student)}
                  >
                    {t("pages.students.actions.edit", language)}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {pagination && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {t("pages.students.pagination.show", language)}
            </span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
              <option value="48">48</option>
              <option value="60">60</option>
            </select>
            <span className="text-sm text-gray-600">
              {t("pages.students.pagination.perPage", language)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {t("common.previous", language)}
            </Button>
            <span className="mx-2">
              {t("common.page", language)} {currentPage}{" "}
              {t("common.of", language)} {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, pagination.totalPages)
                )
              }
              disabled={currentPage === pagination.totalPages}
            >
              {t("common.next", language)}
            </Button>
          </div>
        </div>
      )}

      {selectedStudent && (
        <EditStudentDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          student={selectedStudent}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}
