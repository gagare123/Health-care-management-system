import Image from "next/image";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

interface SearchParamProps {
  params: Promise<{ userId: string }>; 
}

export default async function NewAppointment({ params }: SearchParamProps) {
  const { userId } = await params; 
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen overflow-x-auto">
      {/* Left section - Fixed minimum width on mobile */}
      <section className="remove-scrollbar container min-w-full sm:min-w-[75%] md:min-w-[70%] lg:min-w-0 flex-shrink-0 my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={100}
            width={100}
            alt="CarePulse logo"
            className="mb-12 h-10 w-fit"
          />

          {/* Appointment Form */}
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="text-dark-600 mt-10 py-12">© 2025 CarePulse</p>
        </div>
      </section>

      {/* Right side image - Full size, scrollable on mobile */}
      <div className="relative min-w-[300px] sm:min-w-[350px] md:w-[390px] lg:max-w-[390px] flex-shrink-0 h-full">
        <Image
          src="/assets/images/carepulse1-img.jpg"
          fill
          alt="appointment"
          className="object-cover object-bottom"
          priority
        />
      </div>
    </div>
  );
}

