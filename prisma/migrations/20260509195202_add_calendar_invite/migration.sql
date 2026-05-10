-- CreateTable
CREATE TABLE "CalendarInvite" (
    "id" SERIAL NOT NULL,
    "calendarId" INTEGER NOT NULL,
    "inviterId" INTEGER NOT NULL,
    "inviteeId" INTEGER NOT NULL,

    CONSTRAINT "CalendarInvite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CalendarInvite" ADD CONSTRAINT "CalendarInvite_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarInvite" ADD CONSTRAINT "CalendarInvite_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarInvite" ADD CONSTRAINT "CalendarInvite_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
