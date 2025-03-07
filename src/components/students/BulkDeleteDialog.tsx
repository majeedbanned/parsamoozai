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

interface BulkDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onConfirm: () => void;
  loading?: boolean;
}

export function BulkDeleteDialog({
  open,
  onOpenChange,
  selectedCount,
  onConfirm,
  loading = false,
}: BulkDeleteDialogProps) {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("pages.students.dialog.bulkDelete.title", language)}
          </DialogTitle>
          <DialogDescription>
            {t("pages.students.dialog.bulkDelete.description", language, {
              count: selectedCount,
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
            {t("pages.students.dialog.bulkDelete.confirm", language)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
