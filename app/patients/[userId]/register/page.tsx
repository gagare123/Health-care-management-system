
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
  
  console.log("📍 Register page - userId from params:", userId);
  
  const user = await getUser(userId);
  
  console.log("📍 Register page - fetched user:", user);
  
  if (!user || !user.$id) {
    console.error("❌ User not found for userId:", userId);
    redirect("/");
  }

  return (
    <div className="flex h-screen max-h-screen">
      {/* Left section */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="CarePulse logo"
            className="mb-12"
          />

          <RegisterForm user={user} />

          <p className="text-dark-600 xl:text-left">© 2025 CarePulse</p>
        </div>
      </section>
{/* Right-side image */}
{/* <Image
  src="/assets/images/register-img.png"
  height={1000}
  width={1000}
  alt="patient register"
  className="side-img max-w-[390px] h-auto"
  style={{ width: 'auto', height: 'auto', maxWidth: '390px' }}
  priority
/> */}
{/* eslint-disable-next-line @next/next/no-img-element */}
<img
  src="/assets/images/register-img.png"
  alt="patient register"
  className="side-img max-w-[390px] h-auto object-cover"
  style={{ width: 'auto', height: 'auto', maxWidth: '390px' }}
/>

    </div>
  );
};

export default Register;













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
  
//   const user = await getUser(userId);
  
//   if (!user || !user.$id) {
//     redirect("/");
//   }

//   return (
//     <div className="flex h-screen max-h-screen">
//       <section className="remove-scrollbar container">
//         <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
//           <Image
//             src="/assets/icons/logo-full.svg"
//             height={32}
//             width={162}
//             alt="CarePulse logo"
//             className="mb-12"
//           />

//           <RegisterForm user={user} />

//           <p className="text-dark-600 xl:text-left">© 2025 CarePulse</p>
//         </div>
//       </section>

//       {/* ✅ Image with inline styles to override CSS */}
//       <Image
//         src="/assets/images/register-img.png"
//         height={1000}
//         width={1000}
//         alt="patient register"
//         className="max-w-[390px]"
//         style={{ 
//           width: 'auto', 
//           height: 'auto', 
//           maxWidth: '390px',
//           display: 'block',
//           objectFit: 'cover'
//         }}
//         priority
//       />
//     </div>
//   );
// };

// export default Register;





























