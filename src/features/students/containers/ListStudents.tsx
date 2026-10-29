import { Box, Table } from "@/core/components/ui";
import type { Student } from "../types";
import { columnsTable, studentsMock } from "../consts";

interface ListStudentsProps {
  onSelectStudent: (student: Student) => void;
}

export function ListStudents({ onSelectStudent }: ListStudentsProps) {
  const activeStudents = studentsMock.filter(
    (student) => student.status === "Ativo",
  ).length;

  return (
    <Box>
      <section
        aria-label="Lista de estudantes"
        className="overflow-hidden rounded-xl border border-border bg-card"
      >
        <Box
          display="flex"
          direction="column"
          className="divide-y divide-border"
          gap={20}
        >
          <dl className="grid grid-cols-2 divide-x divide-border rounded-xl border border-border bg-card">
            <div className="px-5 py-4">
              <dt className="text-sm text-muted-foreground">
                Estudantes cadastrados
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight">
                {studentsMock.length}
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
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-semibold text-card-foreground">
                Lista de estudantes
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {studentsMock.length} registros no diretório
              </p>
            </div>
          </div>
        </Box>
        <Table.Root
          data={studentsMock}
          columns={columnsTable}
          getRowId={(row) => row.id}
          pageSize={10}
          wrapperClassName="overflow-hidden rounded-none border-0 bg-card shadow-none"
          className="border-0"
        >
          <Table.Header className="bg-muted/50" />
          <Table.Body<Student>
            emptyMessage="Nenhum estudante encontrado"
            onRowClick={onSelectStudent}
          />
        </Table.Root>
      </section>
    </Box>
  );
}
