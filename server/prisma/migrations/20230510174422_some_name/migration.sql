-- AlterTable
ALTER TABLE "auditt" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "auditt_pkey" PRIMARY KEY ("id");
