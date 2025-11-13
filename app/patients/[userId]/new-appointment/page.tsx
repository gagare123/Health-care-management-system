import Image from "next/image";
import {AppointmentForm} from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

interface SearchParamProps {
  params: Promise<{ userId: string }>;
}

export default async function NewAppointment({ params }: SearchParamProps) {
  const { userId } = await params;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      {/* Left section */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="CarePulse logo"
            className="mb-12"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="text-dark-600 mt-10 py-12">© 2025 CarePulse</p>
        </div>
      </section>

      {/* Right-side image - KEY: added h-auto */}
    
      <Image
        src="/assets/images/carepulse1-img.jpg"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] h-auto bg-bottom"
        priority
      />
    </div>
  );
}


















// import Image from "next/image";
// import AppointmentForm from "@/components/forms/AppointmentForm";
// import { getPatient } from "@/lib/actions/patient.actions";

// interface SearchParamProps {
//   params: Promise<{ userId: string }>; // 👈 async route params
// }

// export default async function NewAppointment({ params }: SearchParamProps) {
//   const { userId } = await params; // ✅ must await
//   const patient = await getPatient(userId);

//   return (
//     <div className="flex h-screen max-h-screen">
//       {/* Left section */}
//       <section className="remove-scrollbar container my-auto">
//         <div className="sub-container max-w-[860px] flex-1 justify-between">
//           <Image
//             src="/assets/icons/logo-full.svg"
//             height={100}
//             width={100}
//             alt="CarePulse logo"
//             className="mb-12 h-10 w-fit"
//           />

//           {/* Appointment Form */}
//           <AppointmentForm
//             type="create"
//             userId={userId}
//             patientId={patient.$id}
//           />

//           <p className="text-dark-600 mt-10 py-12">© 2025 CarePulse</p>
//         </div>
//       </section>

//       {/* Right-side image */}
//       <Image
//         src="/assets/images/appointment-img.png"
//         height={1000}
//         width={1000}
//         alt="appointment"
//         className="side-img max-w-[390px] object-cover bg-bottom"
//         priority
//       />
//     </div>
//   );
// }


















