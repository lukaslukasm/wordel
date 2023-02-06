-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'SK',
    "nOfGames" INTEGER NOT NULL DEFAULT 0,
    "winsOnTry1" INTEGER NOT NULL DEFAULT 0,
    "winsOnTry2" INTEGER NOT NULL DEFAULT 0,
    "winsOnTry3" INTEGER NOT NULL DEFAULT 0,
    "winsOnTry4" INTEGER NOT NULL DEFAULT 0,
    "winsOnTry5" INTEGER NOT NULL DEFAULT 0,
    "winsOnTry6" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
