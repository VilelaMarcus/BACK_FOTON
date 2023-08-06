-- CreateEnum
CREATE TYPE "GalvoStatus" AS ENUM ('OK', 'MEDIO', 'RUIM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN DEFAULT false,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "owner" TEXT,
    "email" TEXT,
    "logoUrl" TEXT,
    "address" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laser" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "brand" TEXT NOT NULL,

    CONSTRAINT "Laser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaserOfCustomer" (
    "id" TEXT NOT NULL,
    "laser_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "LaserOfCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerVisitMeasurement" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "unresolvedDefect" TEXT,
    "oph" INTEGER,
    "surgery" INTEGER,
    "arf" INTEGER,
    "arfChange" TIMESTAMP(3),
    "changeNr" INTEGER,
    "v1" INTEGER,
    "v2" INTEGER,
    "energy" DOUBLE PRECISION,
    "e1g" INTEGER,
    "e100" INTEGER,
    "e1" TEXT,
    "hom" TEXT,
    "mirrow45p1" TEXT,
    "mirrow45p2" TEXT,
    "foco1" TEXT,
    "foco2" TEXT,
    "e4" TEXT,
    "main" TEXT,
    "galvos" "GalvoStatus",
    "head" TEXT,
    "oc" TEXT,
    "hr" TEXT,
    "tecnic" TEXT,
    "servicePerformed" TEXT,
    "observation" TEXT,
    "he" INTEGER,
    "halogen" TEXT,
    "water" TEXT,
    "fill" INTEGER,
    "trans" INTEGER,
    "arfPorcentage" INTEGER,
    "spliter" TEXT,
    "m1" TEXT,
    "m2" TEXT,
    "m3" TEXT,
    "l2" TEXT,
    "l3" TEXT,
    "integrator" TEXT,
    "motor" TEXT,
    "cavity" TEXT,
    "bs" TEXT,
    "focus" TEXT,
    "aten" TEXT,
    "mirrow45" TEXT,
    "eletronics" TEXT,
    "useHours" INTEGER,
    "lampadHours" INTEGER,
    "osc" DOUBLE PRECISION,
    "amp" DOUBLE PRECISION,
    "powerAmp" INTEGER,
    "powerOsc" INTEGER,
    "pumpings" INTEGER,
    "laser_of_customer_id" TEXT NOT NULL,

    CONSTRAINT "CustomerVisitMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Laser_name_key" ON "Laser"("name");

-- AddForeignKey
ALTER TABLE "LaserOfCustomer" ADD CONSTRAINT "LaserOfCustomer_laser_id_fkey" FOREIGN KEY ("laser_id") REFERENCES "Laser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaserOfCustomer" ADD CONSTRAINT "LaserOfCustomer_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerVisitMeasurement" ADD CONSTRAINT "CustomerVisitMeasurement_laser_of_customer_id_fkey" FOREIGN KEY ("laser_of_customer_id") REFERENCES "LaserOfCustomer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
