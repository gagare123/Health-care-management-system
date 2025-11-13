import Image from "next/image";
import PatientForm from '@/components/forms/PatientForm';
import Link from "next/link";
import PasskeyModal from "@/components/PasskeyModal";

interface SearchParamProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Home = async ({ searchParams }: SearchParamProps) => {
  const params = await searchParams;
  const isAdmin = params?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          {/* <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link> */}
          <Image 
            src="/assets/icons/logo-full.svg" 
            height={100}
            width={100} 
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
      
      <Image 
        src="/assets/images/onboarding-img.png" 
        height={1000} 
        width={1000}
        alt="patient"
        className="w-1/2 h-full object-cover"
      />
    </div>
  );
}

export default Home;