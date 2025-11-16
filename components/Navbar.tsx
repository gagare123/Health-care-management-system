// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const pathname = usePathname();
//   const match = pathname.match(/patients\/([^/]+)/);
//   const userId = match ? match[1] : "6915eb0900364c265e8f";

//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const links = [
//     { href: "/", label: "Home" },
//     { href: "/admin", label: "Admin" },
//     { href: `/patients/${userId}/register`, label: "Register" },
//     { href: `/patients/${userId}/new-appointment`, label: "Appointment" },
//   ];

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className="flex items-center justify-between px-6 py-3 border-b border-border bg-background sticky top-0 z-50">
//       {/* Logo */}
//       <p className="text-2xl font-semibold">Health Care Management System</p>

//       {/* Desktop Links */}
//       <div className="hidden md:flex items-center gap-3">
//         {links.map((link) => (
//           <Link key={link.href} href={link.href}>
//          <Button
//              variant={pathname === link.href ? "default" : "ghost"}
//         >
//           {link.label}
//        </Button>

//           </Link>
//         ))}
//       </div>

//       {/* Mobile Hamburger */}
//       <div className="relative md:hidden">
//         {/* <button
//           className="text-foreground focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle menu"
//         >
//           {menuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button> */}
//       


//         {/* Dropdown Menu */}
//         {menuOpen && (
//           <div
//             ref={menuRef}
//             className="absolute right-0 mt-2 bg-background border border-border flex flex-col items-start p-4 space-y-2 shadow-lg rounded-md min-w-[150px] z-50"
//           >
//             {links.map((link) => (
//               <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
//                 <Button
//                   variant={pathname === link.href || pathname.includes(link.label.toLowerCase()) ? "default" : "ghost"}
//                   className="w-full justify-start"
//                 >
//                   {link.label}
//                 </Button>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const match = pathname.match(/patients\/([^/]+)/);
  const userId = match ? match[1] : "6915eb0900364c265e8f";

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Admin" },
    { href: `/patients/${userId}/register`, label: "Register" },
    { href: `/patients/${userId}/new-appointment`, label: "Appointment" },
  ];

  // Parent route matching
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-border bg-background sticky top-0 z-50">
      <p className="text-2xl font-semibold">Health Care Management System</p>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button variant={isActive(link.href) ? "default" : "ghost"}>
              {link.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Mobile */}
      <div className="relative md:hidden">
        <button
          className="text-foreground focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 bg-background border border-border flex flex-col items-start p-4 space-y-2 shadow-lg rounded-md min-w-[150px] z-50"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                <Button
                  variant={isActive(link.href) ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
