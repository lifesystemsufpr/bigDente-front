import { useRef, useState, type KeyboardEvent } from "react";
import {
  FileChartColumnIncreasing,
  LayoutDashboard,
  Mail,
  Plus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../core/components/ui/Avatar";
import { Badge } from "../../../core/components/ui/Badge";
import { Button } from "../../../core/components/ui/Button";
import { Drawer } from "../../../core/components/ui/Drawer";
import { Table, createColumn } from "../../../core/components/ui/table";
import { clientRoutes } from "../../../core/configs/client.routes";
import { Box } from "@/core/components/ui";

type Student = {
  id: number;
  nome: string;
  grr: string;
  codigo: string;
  status: string;
  email: string;
};

const students: Student[] = [
  {
    id: 1,
    nome: "Ana Clara",
    grr: "GRR20254456",
    codigo: "EJS",
    status: "Ativo",
    email: "ana.clara@aluno.edu.br",
  },
  {
    id: 2,
    nome: "Sofia Costa",
    grr: "GRR20251192",
    codigo: "BEV",
    status: "Ativo",
    email: "sofia.costa@aluno.edu.br",
  },
];

const statusClass = (status: string) =>
  status === "Ativo"
    ? "bg-success-soft text-success-soft-foreground"
    : "bg-muted text-muted-foreground";

const columns = [
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

/* ---------- Navegação de abas (lateral no desktop, horizontal no mobile) ---------- */

type TabItem = { id: string; label: string; icon: LucideIcon };

const tabs: TabItem[] = [
  { id: "painel-geral", label: "Painel geral", icon: LayoutDashboard },
  { id: "gestao-alunos", label: "Gestão de alunos", icon: Users },
  {
    id: "relatorios-auditoria",
    label: "Relatórios e Auditoria",
    icon: FileChartColumnIncreasing,
  },
];

type SideTabsProps = {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
};

const SideTabs = ({ items, value, onChange }: SideTabsProps) => {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const next = (index + items.length) % items.length;
    refs.current[next]?.focus();
    onChange(items[next].id);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(items.length - 1);
        break;
    }
  };

  return (
    <nav aria-label="Navegação principal">
      <div className="flex justify-center items-center gap-3 mb-6">
        <div className="bg-[#002366] p-4 rounded-full shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 20.75c-1.4-1.03-2-2.74-2-4.35v-3.5c0-1.62-.6-3.33-2-4.35A3.5 3.5 0 0 1 8.5 2h7a3.5 3.5 0 0 1 2.5 6.55c-1.4 1.02-2 2.73-2 4.35v3.5c0 1.62-.6 3.33-2 4.35" />
            <path d="M12 11v9" />
          </svg>
        </div>
        <p className="font-bold text-lg">ToothSystem</p>
      </div>
      <Box
        role="tablist"
        aria-orientation="vertical"
        className="flex gap-2 overflow-x-auto rounded-2xl border border-border bg-card p-3 shadow-sm lg:flex-col lg:overflow-visible lg:p-4"
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const selected = item.id === value;

          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={[
                "flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                selected
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            >
              <Icon size={40} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </Box>
    </nav>
  );
};

/* ---------- Página ---------- */

export const ManagerStudents = () => {
  const [activeTab, setActiveTab] = useState("gestao-alunos");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const navigate = useNavigate();
  const activeStudents = students.filter(
    (student) => student.status === "Ativo",
  ).length;
  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-8">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <SideTabs items={tabs} value={activeTab} onChange={setActiveTab} />
          </aside>

          <div
            role="tabpanel"
            id={`panel-${currentTab.id}`}
            aria-labelledby={`tab-${currentTab.id}`}
            className="min-w-0"
          >
            {activeTab === "gestao-alunos" ? (
              <div className="space-y-6">
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

                <dl className="grid grid-cols-2 divide-x divide-border rounded-xl border border-border bg-card">
                  <div className="px-5 py-4">
                    <dt className="text-sm text-muted-foreground">
                      Estudantes cadastrados
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight">
                      {students.length}
                    </dd>
                  </div>
                  <div className="px-5 py-4">
                    <dt className="text-sm text-muted-foreground">
                      Matrículas ativas
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-success">
                      {activeStudents}
                    </dd>
                  </div>
                </dl>

                <section
                  aria-label="Lista de estudantes"
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
                    <div>
                      <h2 className="font-semibold text-card-foreground">
                        Lista de estudantes
                      </h2>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {students.length} registros no diretório
                      </p>
                    </div>
                  </div>

                  <Table.Root
                    data={students}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSize={10}
                    wrapperClassName="overflow-hidden rounded-none border-0 bg-card shadow-none"
                    className="border-0"
                  >
                    <Table.Header className="bg-muted/50" />
                    <Table.Body<Student>
                      emptyMessage="Nenhum estudante encontrado"
                      onRowClick={setSelectedStudent}
                    />
                  </Table.Root>
                </section>
              </div>
            ) : (
              <section className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                <currentTab.icon
                  size={28}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
                <h2 className="mt-3 font-semibold">{currentTab.label}</h2>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Esta seção ainda não tem conteúdo. Conecte os dados para
                  exibi-la aqui.
                </p>
              </section>
            )}
          </div>
        </div>
      </div>

      <Drawer
        open={selectedStudent !== null}
        onClose={() => setSelectedStudent(null)}
        anchor="right"
        size="lg"
        className="gap-0 p-0"
      >
        {selectedStudent && (
          <div className="space-y-7 p-6">
            <section className="flex items-center gap-4 rounded-xl bg-primary-soft p-4">
              <Avatar name={selectedStudent.nome} size="lg" color="primary" />
              <div className="min-w-0">
                <Badge className={statusClass(selectedStudent.status)}>
                  {selectedStudent.status}
                </Badge>
                <p className="mt-2 flex items-center gap-2 break-all text-sm text-primary-soft-foreground">
                  <Mail size={16} className="shrink-0" aria-hidden="true" />
                  {selectedStudent.email}
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold">Dados acadêmicos</h3>
              <dl className="mt-3 divide-y divide-border rounded-xl border border-border">
                {[
                  ["Matrícula (GRR)", selectedStudent.grr],
                  ["Código breve", selectedStudent.codigo],
                  ["Curso", "Odontologia"],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <dt className="text-sm text-muted-foreground">{label}</dt>
                    <dd className="text-right text-sm font-medium">{val}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <div className="mb-3">
                <h3 className="text-sm font-semibold">Posse de materiais</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Materiais atualmente vinculados ao estudante.
                </p>
              </div>
              <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4">
                <div>
                  <p className="text-sm font-semibold">
                    Marmita Cirúrgica Set A
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Em posse atual
                  </p>
                </div>
                <Badge className="shrink-0 bg-info/10 text-info">Em uso</Badge>
              </div>
            </section>
          </div>
        )}
      </Drawer>
    </main>
  );
};
