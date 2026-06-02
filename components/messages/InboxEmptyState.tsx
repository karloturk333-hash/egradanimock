import { MailOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

/** Prazno stanje pretinca (inbox zero). Statična komponenta bez propsa. */
export function InboxEmptyState() {
  return (
    <EmptyState
      icon={MailOpen}
      headingLevel={2}
      minHeight="50vh"
      title="Pretinac je prazan"
      description="Sve poruke su pročitane ili još nema poruka."
    />
  );
}
