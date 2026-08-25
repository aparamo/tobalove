-- CreateTable
CREATE TABLE "UserFavoriteConference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conferenceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavoriteConference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWatchlistConference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conferenceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWatchlistConference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFavoriteConference_userId_conferenceId_key" ON "UserFavoriteConference"("userId", "conferenceId");

-- CreateIndex
CREATE UNIQUE INDEX "UserWatchlistConference_userId_conferenceId_key" ON "UserWatchlistConference"("userId", "conferenceId");

-- AddForeignKey
ALTER TABLE "UserFavoriteConference" ADD CONSTRAINT "UserFavoriteConference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteConference" ADD CONSTRAINT "UserFavoriteConference_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWatchlistConference" ADD CONSTRAINT "UserWatchlistConference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWatchlistConference" ADD CONSTRAINT "UserWatchlistConference_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
