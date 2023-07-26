/*
  Warnings:

  - Added the required column `users` to the `auditt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auditt" DROP COLUMN "users",
ADD COLUMN     "users" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "auditt" ADD CONSTRAINT "auditt_users_fkey" FOREIGN KEY ("users") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
