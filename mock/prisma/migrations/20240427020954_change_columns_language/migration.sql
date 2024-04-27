/*
  Warnings:

  - You are about to drop the column `data_de_contratacao` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `funcao` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `idade` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `salario` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `age` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hiringDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "data_de_contratacao",
DROP COLUMN "departamento",
DROP COLUMN "funcao",
DROP COLUMN "idade",
DROP COLUMN "nome",
DROP COLUMN "salario",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "hiringDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL;
