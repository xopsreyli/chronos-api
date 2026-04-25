-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('arrangement', 'reminder', 'task');

-- AlterTable
ALTER TABLE "Arrangement" ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'arrangement';

-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'reminder';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'task';
