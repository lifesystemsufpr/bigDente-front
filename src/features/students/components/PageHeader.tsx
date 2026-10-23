import { Button } from "@/core/components/ui";
import { clientRoutes } from "@/core/configs/client.routes";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PageHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gestão de alunos & Diretorios Academicos
        </h1>
      </div>

      <Button
        type="button"
        leftIcon={<Plus size={18} aria-hidden="true" />}
        className="w-full sm:w-auto"
        onClick={() => navigate(clientRoutes.AUTH.REGISTER)}
      >
        Cadastrar estudante
      </Button>
    </header>
  );
}
