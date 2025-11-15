import React from "react";
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { redirect } from "next/navigation";
import Link from "next/link";



interface SearchParamProps {
  params: Promise<{ userId: string }>;
}

//Sentry.metrics.set("user_view_register", user.name);

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
    <div className="flex h-screen max-h-screen">
      {/* Left section */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
         
          {/* <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link> */}
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

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={900}
        alt="patient register"
        className="side-img max-w-[390px] h-auto"
        style={{ width: 'auto', height: 'auto', maxWidth: '390px' }}
        priority
        
      />
    </div>
  );
};

export default Register;