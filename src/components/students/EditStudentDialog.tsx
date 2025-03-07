"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/utils/translations";

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

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student;
  onSuccess: () => void;
}

export function EditStudentDialog({
  open,
  onOpenChange,
  student,
  onSuccess,
}: EditStudentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    username: student.username,
    password: student.password,
    fathername: student.fathername,
    grade: student.grade,
    status: student.status,
  });
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/students/${student.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update student");
      }

      onSuccess();
    } catch (error) {
      console.error("Error updating student:", error);
      alert(
        error instanceof Error ? error.message : "Failed to update student"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("pages.students.edit.title", language)}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name">
                {t("pages.students.form.name", language)}
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">
                {t("pages.students.form.email", language)}
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="username">
                {t("pages.students.form.username", language)}
              </label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">
                {t("pages.students.form.password", language)}
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="fathername">
                {t("pages.students.form.fathername", language)}
              </label>
              <Input
                id="fathername"
                value={formData.fathername}
                onChange={(e) =>
                  setFormData({ ...formData, fathername: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="grade">
                {t("pages.students.form.grade", language)}
              </label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="status">
                {t("pages.students.form.status", language)}
              </label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    {t("pages.students.status.active", language)}
                  </SelectItem>
                  <SelectItem value="inactive">
                    {t("pages.students.status.inactive", language)}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("common.cancel", language)}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? t("common.saving", language)
                : t("common.save", language)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
