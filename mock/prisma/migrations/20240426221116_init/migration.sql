-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "departamento" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "data_de_contratacao" TIMESTAMP(3) NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
