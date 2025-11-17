import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

interface SearchParamProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: SearchParamProps) {
  const resolvedSearchParams = await searchParams;
  const isAdmin = resolvedSearchParams?.admin === "true";

  // If admin parameter is present, redirect to actual admin page
  if (isAdmin) {
    redirect("/admin");
  }

  return (
    <div className="flex h-screen max-h-screen overflow-x-auto">
      {/* Left section - Fixed minimum width on mobile */}
      <section className="remove-scrollbar container min-w-full sm:min-w-[75%] md:min-w-[70%] lg:min-w-0 flex-shrink-0 my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 CarePulse
            </p>
          </div>
        </div>
      </section>

      {/* Right side image - Full size, scrollable on mobile */}
      <div className="relative min-w-[300px] sm:min-w-[350px] md:w-[450px] lg:w-[50%] flex-shrink-0 h-full">
        <Image
          src="/assets/images/onboarding-img.png"
          fill
          alt="patient"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}















// import PatientForm from "@/components/forms/PatientForm";
// import PasskeyModal from "@/components/PasskeyModal";
// import Link from "next/link";
// import Image from "next/image";
// import { redirect } from "next/navigation";

// interface SearchParamProps {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }

// export default async function Home({ searchParams }: SearchParamProps) {
//   const resolvedSearchParams = await searchParams;
//   const isAdmin = resolvedSearchParams?.admin === "true";

//   // If admin parameter is present, redirect to actual admin page
//   if (isAdmin) {
//     redirect("/admin");
//   }

//   return (
//     <div className="flex h-screen max-h-screen">
//       {/* TODO: OTP Verification | PasskeyModal */}

//       <section className="remove-scrollbar container my-auto">
//         <div className="sub-container max-w-[496px]">
//           <Image
//             src="/assets/icons/logo-full.svg"
//             height={1000}
//             width={1000}
//             alt="patient"
//             className="mb-12 h-10 w-fit"
//           />

//           <PatientForm />

//           <div className="text-14-regular mt-20 flex justify-between">
//             <p className="justify-items-end text-dark-600 xl:text-left">
//               © 2025 CarePulse
//             </p>
//           </div>
//         </div>
//       </section>

//       <Image
//         src="/assets/images/onboarding-img.png"
//         height={1000}
//         width={1000}
//         alt="patient"
//         className="side-img max-w-[50%]"
//       />
//     </div>
//   );
// }


