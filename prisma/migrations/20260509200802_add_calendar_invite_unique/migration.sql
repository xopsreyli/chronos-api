/*
  Warnings:

  - A unique constraint covering the columns `[calendarId,inviteeId]` on the table `CalendarInvite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CalendarInvite_calendarId_inviteeId_key" ON "CalendarInvite"("calendarId", "inviteeId");
