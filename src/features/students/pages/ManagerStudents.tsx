import { useState } from "react";
import { Mail } from "lucide-react";
import { Avatar } from "../../../core/components/ui/Avatar";
import { Badge } from "../../../core/components/ui/Badge";
import { Drawer } from "../../../core/components/ui/Drawer";
import { Modal } from "../../../core/components/ui/Modal";
import type { Student } from "../types";
import { ListStudents } from "../containers/ListStudents";
import { statusClass } from "../consts";
import { PageHeader } from "../components/PageHeader";
import { RegisterStudents } from "../containers/RegisterStudents";

export const ManagerStudents = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerFocusRequest, setRegisterFocusRequest] = useState(0);

  const focusRegisterForm = () => {
    setIsRegistering(true);
    setRegisterFocusRequest((request) => request + 1);
  };

  return (
    <main className="bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="space-y-6">
        <PageHeader onRegisterClick={focusRegisterForm} />

        <Modal
          open={isRegistering}
          onClose={() => setIsRegistering(false)}
          title="Cadastrar estudante"
          description="Preencha os dados para cadastrar um novo estudante."
          size="md"
        >
            <RegisterStudents focusRequest={registerFocusRequest} />
        </Modal>

        <ListStudents onSelectStudent={setSelectedStudent} />
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
