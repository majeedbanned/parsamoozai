import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/utils/translations";

interface DeleteStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteStudentDialog({
  open,
  onOpenChange,
  studentName,
  onConfirm,
  loading = false,
}: DeleteStudentDialogProps) {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("pages.students.dialog.delete.title", language)}
          </DialogTitle>
          <DialogDescription>
            {t("pages.students.dialog.delete.description", language, {
              name: studentName,
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {t("common.cancel", language)}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {t("pages.students.dialog.delete.confirm", language)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
