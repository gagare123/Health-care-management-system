import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar"; // ✅ Add this import

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* ✅ Add Navbar globally */}
          <Navbar />

          {/* ✅ Page content */}
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

















// import type { Metadata } from "next";
// import { Plus_Jakarta_Sans } from "next/font/google";
// import "./globals.css";

// import { cn } from "@/lib/utils";
// import { ThemeProvider } from "@/components/theme-provider"; // ✅ import this

// const fontSans = Plus_Jakarta_Sans({
//   variable: "--font-sans",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });

// export const metadata: Metadata = {
//   title: "CarePluse",
//   description: "A healthcare management system",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={cn(
//           "min-h-screen bg-background font-sans antialiased", // ✅ use theme tokens
//           fontSans.variable
//         )}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="dark"
//           enableSystem
//           disableTransitionOnChange
//         >
//           {children} {/* ✅ only once */}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
