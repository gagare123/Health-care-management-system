"use client";

import { Input } from "@/components/ui/input";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { E164Number } from "libphonenumber-js/core";
import PhoneInput from "react-phone-number-input";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormFieldType } from "./forms/PatientForm";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: unknown) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    disabled,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <div className="ml-2 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={iconSrc}
                height={24}
                width={24}
                alt={iconAlt || "icon"}
              />
            </div>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              disabled={disabled}
              value={field.value || ""}
              onChange={field.onChange}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            value={field.value || ""}
            onChange={field.onChange}
            className="shad-textArea"
            disabled={disabled}
          />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <div className="ml-2 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
          </div>
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => field.onChange(date ?? null)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            value={field.value || ""}
            onValueChange={(val) => field.onChange(val)}
          >
            <SelectTrigger className="shad-select-trigger">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;







// "use client";

// import { Input } from "@/components/ui/input";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { E164Number } from "libphonenumber-js/core";
// import PhoneInput from "react-phone-number-input";
// import { Control, FieldPath} from "react-hook-form";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { FormFieldType } from "./forms/PatientForm";
// import {
//   Select,
//   SelectContent,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "./ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";


// interface CustomFormFieldProps<T extends Record<string, unknown>> {
//   control: Control<T>;
//   fieldType: FormFieldType;
//   name: FieldPath<T>;
//   label?: string;
//   placeholder?: string;
//   iconSrc?: string;
//   iconAlt?: string;
//   disabled?: boolean;
//   dateFormat?: string;
//   showTimeSelect?: boolean;
//   children?: React.ReactNode;
//   renderSkeleton?: (field: unknown) => React.ReactNode;
// }

//  const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
//   const {
//     fieldType,
//     iconSrc,
//     iconAlt,
//     placeholder,
//     disabled,
//     renderSkeleton,
//   } = props;

//   switch (fieldType) {
//     case FormFieldType.INPUT:
//       return (
//         <div className="flex rounded-md border border-dark-500 bg-dark-400">
//           {iconSrc && (
//             <div className="ml-2 flex items-center justify-center">
//               {/* ✅ Use regular img for form icons - no warnings */}
//               {/* eslint-disable-next-line @next/next/no-img-element */}
//               <img
//                 src={iconSrc}
//                 height={24}
//                 width={24}
//                 alt={iconAlt || "icon"}
//               />
//             </div>
//           )}
//           <FormControl>
//             <Input
//               placeholder={placeholder}
//               disabled={disabled}
//               {...field}
//               className="shad-input border-0"
//             />
//           </FormControl>
//         </div>
//       );

//     case FormFieldType.TEXTAREA:
//       return (
//         <FormControl>
//           <Textarea
//             placeholder={placeholder}
//             {...field}
//             className="shad-textArea"
//             disabled={disabled}
//           />
//         </FormControl>
//       );

//     case FormFieldType.PHONE_INPUT:
//       return (
//         <FormControl>
//           <PhoneInput
//             defaultCountry="US"
//             placeholder={placeholder}
//             international
//             withCountryCallingCode
//             value={field.value as E164Number | undefined}
//             onChange={field.onChange}
//             className="input-phone"
//           />
//         </FormControl>
//       );

//     case FormFieldType.DATE_PICKER:
//       return (
//         <div className="flex rounded-md border border-dark-500 bg-dark-400">
//           <div className="ml-2 flex items-center justify-center">
//             {/* ✅ Use regular img for calendar icon - no warnings */}
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src="/assets/icons/calendar.svg"
//               height={24}
//               width={24}
//               alt="calendar"
//             />
//           </div>
//           <FormControl>
//             <ReactDatePicker
//               showTimeSelect={props.showTimeSelect ?? false}
//               selected={field.value ? new Date(field.value) : null}
//               onChange={(date: Date | null) => field.onChange(date ?? null)}
//               timeInputLabel="Time:"
//               dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
//               wrapperClassName="date-picker"
//             />
//           </FormControl>
//         </div>
//       );

//     case FormFieldType.SELECT:
//       return (
//         <FormControl>
//           <Select
//             value={field.value || ""}
//             onValueChange={(val) => field.onChange(val)}
//           >
//             <SelectTrigger className="shad-select-trigger">
//               <SelectValue placeholder={props.placeholder} />
//             </SelectTrigger>
//             <SelectContent className="shad-select-content">
//               {props.children}
//             </SelectContent>
//           </Select>
//         </FormControl>
//       );

//     case FormFieldType.SKELETON:
//       return renderSkeleton ? renderSkeleton(field) : null;

//     case FormFieldType.CHECKBOX:
//       return (
//         <FormControl>
//           <div className="flex items-center gap-4">
//             <Checkbox
//               id={props.name}
//               checked={field.value}
//               onCheckedChange={field.onChange}
//             />
//             <label htmlFor={props.name} className="checkbox-label">
//               {props.label}
//             </label>
//           </div>
//         </FormControl>
//       );

//     default:
//       return null;
//   }
// };

// const CustomFormField = (props: CustomProps) => {
//   const { control, fieldType, name, label } = props;

//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className="flex-1">
//           {fieldType !== FormFieldType.CHECKBOX && label && (
//             <FormLabel className="shad-input-label">{label}</FormLabel>
//           )}

//           <RenderField field={field} props={props} />

//           <FormMessage className="shad-error" />
//         </FormItem>
//       )}
//     />
//   );
// };

// export default CustomFormField;

