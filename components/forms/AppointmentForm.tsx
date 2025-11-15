// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Dispatch, SetStateAction, useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { SelectItem } from "@/components/ui/select";
// import { Doctors } from "@/constants";
// import {
//   createAppointment,
//   updateAppointment,
// } from "@/lib/actions/appointment.actions";
// import { getAppointmentSchema } from "@/lib/validation";
// import { Appointment } from "@/types/appwrite.types";

// //import "react-datepicker/dist/react-datepicker.css";

// import CustomFormField from "../CustomFormField";
// import { FormFieldType } from "./PatientForm";
// import SubmitButton from "../submitButton";
// import { Form } from "../ui/form";

// export const AppointmentForm = ({
//   userId,
//   patientId,
//   type = "create",
//   appointment,
//   setOpen,
// }: {
//   userId: string;
//   patientId: string;
//   type: "create" | "schedule" | "cancel";
//   appointment?: Appointment;
//   setOpen?: Dispatch<SetStateAction<boolean>>;
// }) => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const AppointmentFormValidation = getAppointmentSchema(type);
// const form = useForm<z.infer<typeof AppointmentFormValidation>>({
//   resolver: zodResolver(AppointmentFormValidation),
//   defaultValues: {
//     primaryPhysician: appointment?.primaryPhysician || "",  // ✅ Simplified
//     schedule: appointment?.schedule 
//       ? new Date(appointment.schedule)  // ✅ Removed ! operator
//       : new Date(Date.now()),
//     reason: appointment?.reason || "",
//     note: appointment?.note || "",
//     cancellationReason: appointment?.cancellationReason || "",
//   },
// });



//   const onSubmit = async (
//     values: z.infer<typeof AppointmentFormValidation>
//   ) => {
//     setIsLoading(true);

//     let status;
//     switch (type) {
//       case "schedule":
//         status = "scheduled";
//         break;
//       case "cancel":
//         status = "cancelled";
//         break;
//       default:
//         status = "pending";
//     }

//     try {
//       if (type === "create" && patientId) {
//         const appointment = {
//           userId,
//           patient: patientId,
//           primaryPhysician: values.primaryPhysician,
//           schedule: new Date(values.schedule),
//           reason: values.reason!,
//           status: status as Status,
//           note: values.note,
//         };

//         const newAppointment = await createAppointment(appointment);

//         if (newAppointment) {
//           form.reset();
//           router.push(
//             `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
//           );
//         }
//       } else {
//        const appointmentToUpdate = {
//   userId,
//   appointmentId: appointment?.$id || "", 
//   appointment: {
//     primaryPhysician: values.primaryPhysician,
//     schedule: new Date(values.schedule),
//     status: status as Status,
//     cancellationReason: values.cancellationReason,
//   },
//   type,
// };

//         const updatedAppointment = await updateAppointment(appointmentToUpdate);

//         if (updatedAppointment) {
//          if (setOpen) {
//          setOpen(false);
//         }
//           form.reset();
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     setIsLoading(false);
//   };

//   let buttonLabel;
//   switch (type) {
//     case "cancel":
//       buttonLabel = "Cancel Appointment";
//       break;
//     case "schedule":
//       buttonLabel = "Schedule Appointment";
//       break;
//     default:
//       buttonLabel = "Submit Apppointment";
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
//         {type === "create" && (
//           <section className="mb-12 space-y-4">
//             <h1 className="header">New Appointment</h1>
//             <p className="text-dark-700">
//               Request a new appointment in 10 seconds.
//             </p>
//           </section>
//         )}

//         {type !== "cancel" && (
//           <>
//             <CustomFormField
//               fieldType={FormFieldType.SELECT}
//               control={form.control}
//               name="primaryPhysician"
//               label="Doctor"
//               placeholder="Select a doctor"
//             >
//               {Doctors.map((doctor, i) => (
//                 <SelectItem key={doctor.name + i} value={doctor.name}>
//                   <div className="flex cursor-pointer items-center gap-2">
//                     <Image
//                       src={doctor.image}
//                       width={32}
//                       height={32}
//                       alt="doctor"
//                       className="rounded-full border border-dark-500"
//                     />
//                     <p>{doctor.name}</p>
//                   </div>
//                 </SelectItem>
//               ))}
//             </CustomFormField>

//             <CustomFormField
//               fieldType={FormFieldType.DATE_PICKER}
//               control={form.control}
//               name="schedule"
//               label="Expected appointment date"
//               showTimeSelect
//               dateFormat="MM/dd/yyyy  -  h:mm aa"
//             />

//             <div
//               className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
//             >
//               <CustomFormField
//                 fieldType={FormFieldType.TEXTAREA}
//                 control={form.control}
//                 name="reason"
//                 label="Appointment reason"
//                 placeholder="Annual montly check-up"
//                 disabled={type === "schedule"}
//               />

//               <CustomFormField
//                 fieldType={FormFieldType.TEXTAREA}
//                 control={form.control}
//                 name="note"
//                 label="Comments/notes"
//                 placeholder="Prefer afternoon appointments, if possible"
//                 disabled={type === "schedule"}
//               />
//             </div>
//           </>
//         )}

//         {type === "cancel" && (
//           <CustomFormField
//             fieldType={FormFieldType.TEXTAREA}
//             control={form.control}
//             name="cancellationReason"
//             label="Reason for cancellation"
//             placeholder="Urgent meeting came up"
//           />
//         )}

//         <SubmitButton
//           isLoading={isLoading}
//           className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
//         >
//           {buttonLabel}
//         </SubmitButton>
//       </form>
//     </Form>
//   );
// };

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Dispatch, SetStateAction, useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { SelectItem } from "@/components/ui/select";
// import { Doctors } from "@/constants";
// import {
//   createAppointment,
//   updateAppointment,
// } from "@/lib/actions/appointment.actions";
// import { 
//   CreateAppointmentSchema,
//   ScheduleAppointmentSchema,
//   CancelAppointmentSchema,
// } from "@/lib/validation";
// import { Appointment } from "@/types/appwrite.types";

// import CustomFormField from "../CustomFormField";
// import { FormFieldType } from "./PatientForm";
// import SubmitButton from "../submitButton";
// import { Form } from "../ui/form";

// export const AppointmentForm = ({
//   userId,
//   patientId,
//   type = "create",
//   appointment,
//   setOpen,
// }: {
//   userId: string;
//   patientId: string;
//   type: "create" | "schedule" | "cancel";
//   appointment?: Appointment;
//   setOpen?: Dispatch<SetStateAction<boolean>>;
// }) => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   // Get the correct schema based on type
//   const getSchema = () => {
//     switch (type) {
//       case "create":
//         return CreateAppointmentSchema;
//       case "cancel":
//         return CancelAppointmentSchema;
//       default:
//         return ScheduleAppointmentSchema;
//     }
//   };

//   const AppointmentFormValidation = getSchema();

//   const form = useForm<z.infer<typeof AppointmentFormValidation>>({
//     resolver: zodResolver(AppointmentFormValidation) as any,
//     defaultValues: {
//       primaryPhysician: appointment?.primaryPhysician || "",
//       schedule: appointment?.schedule 
//         ? new Date(appointment.schedule)
//         : new Date(Date.now()),
//       reason: appointment?.reason || "",
//       note: appointment?.note || "",
//       cancellationReason: appointment?.cancellationReason || "",
//     },
//   });

//   const onSubmit = async (
//     values: z.infer<typeof AppointmentFormValidation>
//   ) => {
//     setIsLoading(true);

//     let status;
//     switch (type) {
//       case "schedule":
//         status = "scheduled";
//         break;
//       case "cancel":
//         status = "cancelled";
//         break;
//       default:
//         status = "pending";
//     }

//     try {
//       if (type === "create" && patientId) {
//         const appointment = {
//           userId,
//           patient: patientId,
//           primaryPhysician: values.primaryPhysician,
//           schedule: new Date(values.schedule),
//           reason: values.reason!,
//           status: status as Status,
//           note: values.note,
//         };

//         const newAppointment = await createAppointment(appointment);

//         if (newAppointment) {
//           form.reset();
//           router.push(
//             `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
//           );
//         }
//       } else {
//         const appointmentToUpdate = {
//           userId,
//           appointmentId: appointment?.$id || "", 
//           timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//           appointment: {
//             primaryPhysician: values.primaryPhysician,
//             schedule: new Date(values.schedule),
//             status: status as Status,
//             cancellationReason: values.cancellationReason,
//           },
//           type,
//         };

//         const updatedAppointment = await updateAppointment(appointmentToUpdate);

//         if (updatedAppointment) {
//           if (setOpen) {
//             setOpen(false);
//           }
//           form.reset();
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     setIsLoading(false);
//   };

//   let buttonLabel;
//   switch (type) {
//     case "cancel":
//       buttonLabel = "Cancel Appointment";
//       break;
//     case "schedule":
//       buttonLabel = "Schedule Appointment";
//       break;
//     default:
//       buttonLabel = "Submit Apppointment";
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
//         {type === "create" && (
//           <section className="mb-12 space-y-4">
//             <h1 className="header">New Appointment</h1>
//             <p className="text-dark-700">
//               Request a new appointment in 10 seconds.
//             </p>
//           </section>
//         )}

//         {type !== "cancel" && (
//           <>
//             <CustomFormField
//               fieldType={FormFieldType.SELECT}
//               control={form.control}
//               name="primaryPhysician"
//               label="Doctor"
//               placeholder="Select a doctor"
//             >
//               {Doctors.map((doctor, i) => (
//                 <SelectItem key={doctor.name + i} value={doctor.name}>
//                   <div className="flex cursor-pointer items-center gap-2">
//                     <Image
//                       src={doctor.image}
//                       width={32}
//                       height={32}
//                       alt="doctor"
//                       className="rounded-full border border-dark-500"
//                     />
//                     <p>{doctor.name}</p>
//                   </div>
//                 </SelectItem>
//               ))}
//             </CustomFormField>

//             <CustomFormField
//               fieldType={FormFieldType.DATE_PICKER}
//               control={form.control}
//               name="schedule"
//               label="Expected appointment date"
//               showTimeSelect
//               dateFormat="MM/dd/yyyy  -  h:mm aa"
//             />

//             <div
//               className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
//             >
//               <CustomFormField
//                 fieldType={FormFieldType.TEXTAREA}
//                 control={form.control}
//                 name="reason"
//                 label="Appointment reason"
//                 placeholder="Annual montly check-up"
//                 disabled={type === "schedule"}
//               />

//               <CustomFormField
//                 fieldType={FormFieldType.TEXTAREA}
//                 control={form.control}
//                 name="note"
//                 label="Comments/notes"
//                 placeholder="Prefer afternoon appointments, if possible"
//                 disabled={type === "schedule"}
//               />
//             </div>
//           </>
//         )}

//         {type === "cancel" && (
//           <CustomFormField
//             fieldType={FormFieldType.TEXTAREA}
//             control={form.control}
//             name="cancellationReason"
//             label="Reason for cancellation"
//             placeholder="Urgent meeting came up"
//           />
//         )}

//         <SubmitButton
//           isLoading={isLoading}
//           className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
//         >
//           {buttonLabel}
//         </SubmitButton>
//       </form>
//     </Form>
//   );
// };

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../submitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { FileUploader } from "../FileUploader";

interface RegisterFormProps {
  user: User;
}

// Define the form values type explicitly
type PatientFormValues = {
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: "male" | "female" | "other";
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  identificationDocument?: File[];
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
};

const RegisterForm = ({ user }: RegisterFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PatientFormValues>({
    //// @ts-expect-error - zodResolver has type issues with z.coerce.date()
    resolver: zodResolver(PatientFormValidation) as any,
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit: SubmitHandler<PatientFormValues> = async (values) => {
    setIsLoading(true);

    // ✅ Validate user object first
    if (!user || !user.$id) {
      console.error("User object is missing or invalid:", user);
      alert("User information is missing. Please try logging in again.");
      setIsLoading(false);
      return;
    }

    let formData: FormData | undefined;

    // Handle file upload
    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const file = values.identificationDocument[0];
      const blobFile = new Blob([file], { type: file.type });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", file.name);
    }

    try {
      // ✅ Build patient data with explicit userId
      const patientData: RegisterUserParams = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender as Gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: formData,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patientData);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      } else {
        throw new Error("Failed to register patient");
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error registering patient:", err);
      alert(`Failed to register: ${err.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      @ts-expect-error - form type compatibility issue with zodResolver
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        {/* Personal Information */}
        <section className="space-y-6">
          <h2 className="sub-header">Personal Information</h2>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Gagare Lukman"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="lukmangagare@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of Birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const typedField = field as any;
                return (
                  <FormControl>
                    <RadioGroup
                      className="flex h-11 gap-6 xl:justify-between"
                      onValueChange={typedField.onChange}
                      defaultValue={typedField.value}
                    >
                      {GenderOptions.map((option) => (
                        <div key={option} className="radio-group">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                );
              }}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14th Street, Kaduna"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Guardian's Name"
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency Contact Number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        {/* Medical Information */}
        <section className="space-y-6">
          <h2 className="sub-header">Medical Information</h2>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full border border-dark-500"
                  />
                  <span>{doctor.name}</span>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="BlueCross BlueShield"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="ABC123456789"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, pollen, etc."
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current Medication (if any)"
              placeholder="Ibuprofen 200mg, Paracetamol 500mg"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder="Mother had brain cancer, Father has heart disease"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past Medical History"
              placeholder="Appendectomy, Tonsillectomy"
            />
          </div>
        </section>

        {/* Identification */}
        <section className="space-y-6">
          <h2 className="sub-header">Identification & Verification</h2>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select an Identification Type"
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const typedField = field as any;
              return (
                <FormControl>
                  <FileUploader 
                    files={typedField.value} 
                    onChange={typedField.onChange} 
                  />
                </FormControl>
              );
            }}
          />
        </section>

        {/* Consent */}
        <section className="space-y-6">
          <h2 className="sub-header">Consent & Privacy</h2>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to treatment"
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to disclosure of information"
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I consent to privacy policy"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;