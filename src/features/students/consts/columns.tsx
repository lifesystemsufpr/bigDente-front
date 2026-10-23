import { Avatar, Badge, createColumn } from "@/core/components/ui";
import type { Student } from "../types";

export const statusClass = (status: string) =>
  status === "Ativo"
    ? "bg-success-soft text-success-soft-foreground"
    : "bg-muted text-muted-foreground";

export const columnsTable = [
  createColumn<Student>({
    id: "nome",
    field: "nome",
    header: "Nome do aluno",
    sortable: true,
    filterable: true,
    width: "42%",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <Avatar name={String(value ?? row.nome)} size="sm" color="primary" />
        <span className="font-semibold text-foreground transition-colors group-hover:text-primary">
          {row.nome}
        </span>
      </div>
    ),
  }),
  createColumn<Student>({
    id: "grr",
    field: "grr",
    header: "GRR (Matrícula)",
    sortable: true,
    filterable: true,
  }),
  createColumn<Student>({
    id: "codigo",
    field: "codigo",
    header: "Código",
    sortable: true,
    filterable: true,
  }),
  createColumn<Student>({
    id: "status",
    field: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    render: (value) => (
      <Badge className={statusClass(String(value))}>{String(value)}</Badge>
    ),
  }),
];
