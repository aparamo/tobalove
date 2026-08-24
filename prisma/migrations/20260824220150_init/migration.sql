-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Conference" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TEXT,
    "year" INTEGER,
    "organization" TEXT NOT NULL,
    "url" TEXT,
    "youtubeUrl" TEXT,
    "infoAdicional" TEXT,
    "description" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "topics" TEXT[],
    "characters" TEXT[],
    "civilizations" TEXT[],
    "duration" TEXT,
    "language" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "mediaType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dateLabel" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "period" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "consequences" TEXT[],
    "characters" TEXT[],
    "civilizations" TEXT[],
    "topics" TEXT[],
    "sourceConference" JSONB,
    "relatedConferences" TEXT[],

    CONSTRAINT "TimelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeopleGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "peakYear" INTEGER NOT NULL,
    "peakPopulation" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "civilizations" TEXT[],
    "relatedConferences" TEXT[],

    CONSTRAINT "PeopleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineMeta" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "autorContenido" TEXT NOT NULL,
    "enfoque" TEXT NOT NULL,
    "coberturaCronologica" TEXT NOT NULL,
    "totalEventos" INTEGER NOT NULL,
    "fuentesPrincipales" TEXT[],
    "ultimaActualizacion" TEXT NOT NULL,

    CONSTRAINT "TimelineMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeoplesMeta" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "autorContenido" TEXT NOT NULL,
    "enfoque" TEXT NOT NULL,
    "coberturaCronologica" TEXT NOT NULL,
    "totalPueblos" INTEGER NOT NULL,
    "unidadPoblacion" TEXT NOT NULL,
    "fuentesPrincipales" TEXT[],
    "ultimaActualizacion" TEXT NOT NULL,

    CONSTRAINT "PeoplesMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWatchedConference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conferenceId" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWatchedConference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "UserWatchedConference_userId_conferenceId_key" ON "UserWatchedConference"("userId", "conferenceId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWatchedConference" ADD CONSTRAINT "UserWatchedConference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWatchedConference" ADD CONSTRAINT "UserWatchedConference_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
