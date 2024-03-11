-- CreateTable
CREATE TABLE "Employees" (
    "employee_id" TEXT NOT NULL,
    "name_employee" TEXT NOT NULL DEFAULT '',
    "avatar_employee" TEXT DEFAULT '',
    "avatar_path" TEXT DEFAULT '',
    "avatar_file_name" TEXT DEFAULT '',
    "function_employee" TEXT NOT NULL DEFAULT '',
    "workload_employee" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Timesheet" (
    "time_sheet_id" TEXT NOT NULL,
    "in_time" TIMESTAMP(3),
    "launch_in" TIMESTAMP(3),
    "launch_out" TIMESTAMP(3),
    "out_time" TIMESTAMP(3),
    "owed_hours" INTEGER,
    "work_load" INTEGER NOT NULL,
    "hours_worked" INTEGER,
    "overtime" INTEGER,
    "employee_id" TEXT NOT NULL,

    CONSTRAINT "Timesheet_pkey" PRIMARY KEY ("time_sheet_id")
);

-- CreateTable
CREATE TABLE "UserToken" (
    "user_token_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("user_token_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employees_email_key" ON "Employees"("email");

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
