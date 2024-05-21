-- DropTable
DROP TABLE "Pecas";

-- CreateTable
CREATE TABLE "Order_OS" (
    "id" TEXT NOT NULL,
    "laser_id" TEXT,
    "sequence_itens" TEXT[]
);

-- CreateTable
CREATE TABLE "Pecas" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "preco" TEXT,
    "laser_id" TEXT
);