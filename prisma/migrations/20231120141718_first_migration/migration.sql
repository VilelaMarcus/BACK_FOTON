-- CreateEnum
CREATE TYPE "GalvoStatus" AS ENUM ('OK', 'MEDIO', 'RUIM');

-- CreateEnum
CREATE TYPE "OsType" AS ENUM ('ChekBox', 'Text', 'Outro');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "owner" TEXT,
    "email" TEXT,
    "logoUrl" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "tecnic_name" TEXT NOT NULL,
    "email" TEXT,
    "verified" BOOLEAN DEFAULT false,
    "role" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laser" (
    "id" TEXT NOT NULL,
    "laser_name" VARCHAR(255) NOT NULL,
    "brand" TEXT NOT NULL,

    CONSTRAINT "Laser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaserOfCustomer" (
    "id" TEXT NOT NULL,
    "laser_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "address" TEXT,
    "customer_name" TEXT,
    "city" TEXT,
    "zip_code" TEXT,

    CONSTRAINT "LaserOfCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerVisitMeasurement" (
    "id" TEXT NOT NULL,
    "date" TEXT,
    "unresolvedDefect" TEXT,
    "oph" TEXT,
    "surgery" TEXT,
    "arf" TEXT,
    "arfChange" TEXT,
    "changeNr" TEXT,
    "v1" TEXT,
    "v2" TEXT,
    "energy" TEXT,
    "e1g" TEXT,
    "e100" TEXT,
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
    "he" TEXT,
    "halogen" TEXT,
    "water" TEXT,
    "fill" TEXT,
    "trans" TEXT,
    "arfPorcentage" TEXT,
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
    "useHours" TEXT,
    "lampadHours" TEXT,
    "osc" TEXT,
    "amp" TEXT,
    "powerAmp" TEXT,
    "powerOsc" TEXT,
    "pumpings" TEXT,
    "laser_of_customer_id" TEXT NOT NULL,

    CONSTRAINT "CustomerVisitMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OS" (
    "id" TEXT NOT NULL,
    "laser_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "OsType" NOT NULL,

    CONSTRAINT "OS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_tecnic_name_key" ON "User"("tecnic_name");

-- CreateIndex
CREATE UNIQUE INDEX "Laser_laser_name_key" ON "Laser"("laser_name");

-- AddForeignKey
ALTER TABLE "LaserOfCustomer" ADD CONSTRAINT "LaserOfCustomer_laser_id_fkey" FOREIGN KEY ("laser_id") REFERENCES "Laser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaserOfCustomer" ADD CONSTRAINT "LaserOfCustomer_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerVisitMeasurement" ADD CONSTRAINT "CustomerVisitMeasurement_laser_of_customer_id_fkey" FOREIGN KEY ("laser_of_customer_id") REFERENCES "LaserOfCustomer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
