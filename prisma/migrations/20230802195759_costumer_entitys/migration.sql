-- CreateEnum
CREATE TYPE "GalvoStatus" AS ENUM ('OK', 'MEDIO', 'RUIM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN DEFAULT false,
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
CREATE TABLE "LaserOfCostume" (
    "id" TEXT NOT NULL,
    "laserId" TEXT NOT NULL,
    "custumerId" TEXT NOT NULL,

    CONSTRAINT "LaserOfCostume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerVisitMeasurement" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "days" INTEGER,
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
    "powerAmp" DOUBLE PRECISION,
    "powerOsc" DOUBLE PRECISION,
    "pumpings" INTEGER,
    "laserOfCostumeId" TEXT NOT NULL,

    CONSTRAINT "CustomerVisitMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Laser_name_key" ON "Laser"("name");

-- AddForeignKey
ALTER TABLE "LaserOfCostume" ADD CONSTRAINT "LaserOfCostume_laserId_fkey" FOREIGN KEY ("laserId") REFERENCES "Laser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaserOfCostume" ADD CONSTRAINT "LaserOfCostume_custumerId_fkey" FOREIGN KEY ("custumerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerVisitMeasurement" ADD CONSTRAINT "CustomerVisitMeasurement_laserOfCostumeId_fkey" FOREIGN KEY ("laserOfCostumeId") REFERENCES "LaserOfCostume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
