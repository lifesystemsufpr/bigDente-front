const ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

type ROLE = (typeof ROLE)[keyof typeof ROLE];

interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: ROLE;
}

interface IStudent extends IUser {
  studentId?: number;
  code: string;
  grr: string;
  course: string; //Definir se vai ser ENUM ou uma nova tabela
  userId: number;
}