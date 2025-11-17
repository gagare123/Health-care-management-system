// import React from "react";
// import Image from "next/image";
// import RegisterForm from "@/components/forms/RegisterForm";
// import { getUser } from "@/lib/actions/patient.actions";
// import { redirect } from "next/navigation";

// interface SearchParamProps {
//   params: Promise<{ userId: string }>;
// }

// const Register = async ({ params }: SearchParamProps) => {
//   const { userId } = await params;
  
//   console.log(" Register page - userId from params:", userId);
  
//   const user = await getUser(userId);
  
//   console.log(" Register page - fetched user:", user);
  
//   if (!user || !user.$id) {
//     console.error("User not found for userId:", userId);
//     redirect("/");
//   }

//   return (
//     <div className="flex h-screen max-h-screen">
//       {/* Left section - Responsive width */}
//       <section className="remove-scrollbar container w-full sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%]">
//         <div className="sub-container max-w-[860px] flex-col py-10">
         
//           <Image
//             src="/assets/icons/logo-full.svg"
//             height={32}
//             width={162}
//             alt="CarePulse logo"
//             className="mb-12"
//           />

//           <RegisterForm user={user} />

//           <p className="copyright">© 2025 CarePulse</p>
//         </div>
//       </section>

//       {/* Right side image - Responsive width */}
//       <Image
//         src="/assets/images/register-img.png"
//         height={1000}
//         width={900}
//         alt="patient register"
//         className="object-cover w-[15%] sm:w-[15%] md:w-[20%] lg:w-[25%] xl:w-[30%] flex-shrink-0"
//         priority
//       />
//     </div>
//   );
// };

// export default Register;






import React from "react";
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { redirect } from "next/navigation";

interface SearchParamProps {
  params: Promise<{ userId: string }>;
}

const Register = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  
  console.log(" Register page - userId from params:", userId);
  
  const user = await getUser(userId);
  
  console.log(" Register page - fetched user:", user);
  
  if (!user || !user.$id) {
    console.error("User not found for userId:", userId);
    redirect("/");
  }

  return (
    <div className="flex h-screen max-h-screen overflow-x-auto">
      {/* Left section - Fixed minimum width on mobile */}
      <section className="remove-scrollbar container min-w-full sm:min-w-[75%] md:min-w-[70%] lg:min-w-0 flex-shrink-0">
        <div className="sub-container max-w-[860px] flex-col py-10">
         
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="CarePulse logo"
            className="mb-12"
          />

          <RegisterForm user={user} />

          <p className="copyright">© 2025 CarePulse</p>
        </div>
      </section>

      {/* Right side image - Full size, scrollable on mobile */}
      <div className="relative min-w-[300px] sm:min-w-[350px] md:w-[390px] lg:max-w-[390px] flex-shrink-0 h-full">
        <Image
          src="/assets/images/register-img.png"
          fill
          alt="patient register"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Register;