-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('PENDING', 'ACTIVE', 'FINISHED');

-- CreateEnum
CREATE TYPE "Vehicle" AS ENUM ('CAR', 'VAN', 'TRUCK');

-- CreateTable
CREATE TABLE "Driver" (
    "id" VARCHAR(36) NOT NULL,
    "telegramId" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" VARCHAR(36) NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "destinationId" VARCHAR(36) NOT NULL,
    "driverId" VARCHAR(36) NOT NULL,
    "fromId" VARCHAR(36) NOT NULL,
    "status" "RideStatus" NOT NULL,
    "vehicle" "Vehicle" NOT NULL,
    "volunteerId" VARCHAR(36),

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" VARCHAR(36) NOT NULL,
    "city" VARCHAR,
    "country" VARCHAR NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideComment" (
    "id" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "rideId" VARCHAR(36) NOT NULL,
    "authorId" VARCHAR(36) NOT NULL,

    CONSTRAINT "RideComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(36) NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_telegramId_key" ON "Driver"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "Ride_destinationId_key" ON "Ride"("destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "Ride_fromId_key" ON "Ride"("fromId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideComment" ADD CONSTRAINT "RideComment_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideComment" ADD CONSTRAINT "RideComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
