-- CreateTable
CREATE TABLE "auditt" (
    "operationtype" VARCHAR(100),
    "filmname" VARCHAR(100),
    "date" DATE,
    "datenow" DATE,
    "place" VARCHAR(100),
    "users" VARCHAR(100)
);

-- CreateTable
CREATE TABLE "favorite" (
    "id" SERIAL NOT NULL,
    "idusers" INTEGER NOT NULL,
    "idfilm" INTEGER NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "film" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "year" INTEGER NOT NULL,
    "duration" TIME(6) NOT NULL,
    "startrelease" DATE NOT NULL,
    "endrelease" DATE NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "agelimit" INTEGER NOT NULL,
    "idgenre" INTEGER NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hall" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "count_rows" INTEGER NOT NULL,
    "count_place" INTEGER NOT NULL,
    "id_type_plase" INTEGER NOT NULL,

    CONSTRAINT "hall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place" (
    "id" SERIAL NOT NULL,
    "place" INTEGER NOT NULL,
    "idhall" INTEGER NOT NULL,

    CONSTRAINT "place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "datesession" DATE NOT NULL,
    "timesession" TIME(6) NOT NULL,
    "idhall" INTEGER NOT NULL,
    "idfilm" INTEGER NOT NULL,
    "status" VARCHAR(10) DEFAULT 'Active',

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "idsession" INTEGER NOT NULL,
    "idplace" INTEGER NOT NULL,
    "idusers" INTEGER NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "idusers" INTEGER NOT NULL,
    "token" VARCHAR(500) NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeplace" (
    "id" SERIAL NOT NULL,
    "cost_vip" INTEGER NOT NULL,
    "cost_normal" INTEGER NOT NULL,

    CONSTRAINT "typeplace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "login" VARCHAR(50),
    "password" VARCHAR(255),
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) DEFAULT 'User',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_idfilm_fkey" FOREIGN KEY ("idfilm") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_idusers_fkey" FOREIGN KEY ("idusers") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "film" ADD CONSTRAINT "film_idgenre_fkey" FOREIGN KEY ("idgenre") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hall" ADD CONSTRAINT "hall_id_type_plase_fkey" FOREIGN KEY ("id_type_plase") REFERENCES "typeplace"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "place" ADD CONSTRAINT "place_idhall_fkey" FOREIGN KEY ("idhall") REFERENCES "hall"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_idfilm_fkey" FOREIGN KEY ("idfilm") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_idhall_fkey" FOREIGN KEY ("idhall") REFERENCES "hall"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_idplace_fkey" FOREIGN KEY ("idplace") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_idsession_fkey" FOREIGN KEY ("idsession") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_idusers_fkey" FOREIGN KEY ("idusers") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_idusers_fkey" FOREIGN KEY ("idusers") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
