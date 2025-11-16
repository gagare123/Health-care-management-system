import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface SearchParamProps {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Success = async ({ params, searchParams }: SearchParamProps) => {
  // ✅ Await params and searchParams in Next.js 15
  const { userId } = await params;
  const resolvedSearchParams = await searchParams;
  const appointmentId = (resolvedSearchParams?.appointmentId as string) || "";

  // ✅ Fetch appointment
  const appointment = await getAppointment(appointmentId);

  // ✅ Find doctor info
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img flex flex-col justify-between w-full">

         <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
        {/* Logo */}
        <Link href="/" className="mt-6 inline-block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icons/logo-full.svg"
            height={100}
            width={100}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        {/* Success Message */}
        <section className="flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/gifs/success.gif"
            height={100}
            width={200}
            alt="success"
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">Appointment request</span> has
            been successfully submitted
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>

        {/* Appointment Details */}
        <section className="request-details mt-8">
          <p className="font-semibold mb-3">Requested appointment details:</p>

          <div className="flex items-center gap-6 mb-2">
            {doctor?.image && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={doctor.image}
                alt="doctor"
                width={60}
                height={60}
                className="rounded-full"
              />
            )}
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        {/* New Appointment Button */}
        <Button variant="outline" className="shad-primary-btn mt-6" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright mt-6 text-center text-sm text-gray-500">
          © 2025 CarePulse
        </p>
      </div>
    </div>
  );
};

export default Success;

