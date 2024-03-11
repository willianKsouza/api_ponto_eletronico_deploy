export interface IUser {
  employee_id: string;
  name_employee: string;
  avatar_employee?: string | null;
  avatar_path?: string | null;
  avatar_file_name?: string | null;
  function_employee: string;
  workload_employee: number;
  email: string;
  password: string;
  last_register_time_sheet?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deleted_at?: Date | string | null;
}



