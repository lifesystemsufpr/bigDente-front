import { apiRoutes } from "../configs/api.routes";
import { http } from "./client.service";

const ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

type Role = (typeof ROLE)[keyof typeof ROLE];

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface IStudent extends IUser {
  studentId?: number;
  code: string;
  grr: string;
  course: string; //Definir se vai ser ENUM ou uma nova tabela
  userId: number;
}

export type NewStudentInput = Pick<
  IStudent,
  "name" | "email" | "password" | "code" | "grr" | "course"
>;

export async function createStudent(student: NewStudentInput): Promise<IStudent> {
  return http.post<IStudent>(apiRoutes.STUDENTS.CREATE, {
    ...student,
    role: ROLE.USER,
  });
}