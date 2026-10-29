import { Button } from "@/core/components/ui";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  onRegisterClick: () => void;
}

export function PageHeader({ onRegisterClick }: PageHeaderProps) {

  return (
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gestão de alunos & Diretórios Acadêmicos
        </h1>
      </div>

      <Button
        type="button"
        leftIcon={<Plus size={18} aria-hidden="true" />}
        className="w-full sm:w-auto"
        onClick={onRegisterClick}
      >
        Cadastrar estudante
      </Button>
    </header>
  );
}
