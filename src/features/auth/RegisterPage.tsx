import { useState, type FormEvent } from "react";
import { GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../core/components/ui/Button";
import { Input } from "../../core/components/ui/Input";
import { clientRoutes } from "../../core/configs/client.routes";
import { createStudent, type NewStudentInput } from "../../core/services/user.service";

const initialForm: NewStudentInput = {
  name: "",
  email: "",
  password: "",
  grr: "",
  code: "",
  course: "",
};

export function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const updateField = (field: keyof NewStudentInput, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createStudent(form);
      toast.success("Estudante cadastrado com sucesso.");
      navigate(clientRoutes.STUDENTS.MANAGE);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : typeof requestError === "object" &&
              requestError !== null &&
              "message" in requestError &&
              typeof requestError.message === "string"
            ? requestError.message
            : "Não foi possível cadastrar o estudante.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-2">
      <section className="hidden flex-col items-center justify-center bg-primary px-12 py-16 text-primary-foreground lg:flex">
        <div className="rounded-2xl bg-primary-foreground/10 p-6">
          <GraduationCap size={56} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h2 className="mt-8 text-center text-3xl font-bold">Cadastro de estudantes</h2>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-xl">
          <Link
            to={clientRoutes.STUDENTS.MANAGE}
            className="text-sm font-medium text-primary hover:underline"
          >
            Voltar para gestão de alunos
          </Link>
          <h1 className="mt-8 text-3xl font-bold tracking-tight">Cadastrar estudante</h1>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium sm:col-span-2" htmlFor="student-name">
                Nome completo
                <Input
                  id="student-name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Nome do estudante"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium sm:col-span-2" htmlFor="student-email">
                E-mail
                <Input
                  id="student-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="estudante@exemplo.com"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium sm:col-span-2" htmlFor="student-password">
                Senha inicial
                <Input
                  id="student-password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  placeholder="Crie uma senha"
                  minLength={8}
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium" htmlFor="student-grr">
                Matrícula (GRR)
                <Input
                  id="student-grr"
                  value={form.grr}
                  onChange={(event) => updateField("grr", event.target.value)}
                  placeholder="Ex: GRR20212345"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium" htmlFor="student-code">
                Código
                <Input
                  id="student-code"
                  value={form.code}
                  onChange={(event) => updateField("code", event.target.value)}
                  placeholder="Código acadêmico"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium sm:col-span-2" htmlFor="student-course">
                Curso
                <Input
                  id="student-course"
                  value={form.course}
                  onChange={(event) => updateField("course", event.target.value)}
                  placeholder="Nome do curso"
                  required
                />
              </label>
            </div>

            <Button type="submit" fullWidth loading={loading} loadingText="Cadastrando estudante">
              Cadastrar estudante
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
