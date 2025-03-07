"use client";

import { useState } from "react";
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

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  status: "active" | "inactive";
}

const students: Student[] = [
  {
    id: "1",
    name: "علی محمدی",
    email: "ali@example.com",
    grade: "دهم",
    status: "active",
  },
  {
    id: "2",
    name: "سارا احمدی",
    email: "sara@example.com",
    grade: "یازدهم",
    status: "active",
  },
  {
    id: "3",
    name: "محمد رضایی",
    email: "mohammad@example.com",
    grade: "دوازدهم",
    status: "inactive",
  },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { language, direction } = useLanguage();

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Button>{t("pages.students.addStudent", language)}</Button>
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
