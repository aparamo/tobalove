-- AlterTable
ALTER TABLE "PeopleGroup" ADD COLUMN     "isSecondary" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TimelineEvent" ADD COLUMN     "isSecondary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isYoutubeConference" BOOLEAN NOT NULL DEFAULT true;
