"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // icons

export default function Navbar() {
  const pathname = usePathname();
  const match = pathname.match(/patients\/([^/]+)/);
  const userId = match ? match[1] : "6915eb0900364c265e8f"; // fallback for demo

  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Admin" },
    { href: `/patients/${userId}/register`, label: "Register" },
    { href: `/patients/${userId}/new-appointment`, label: "Appointment" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-border bg-background sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
        <img src="/assets/icons/logo-full.svg" alt="CarePulse Logo" className="h-8 w-auto" />
        <span>CarePulse</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button
              variant={pathname === link.href || pathname.includes(link.label.toLowerCase()) ? "default" : "ghost"}
            >
              {link.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden text-foreground focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b border-border flex flex-col items-start p-4 space-y-3 shadow-md md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              <Button
                variant={pathname === link.href || pathname.includes(link.label.toLowerCase()) ? "default" : "ghost"}
                className="w-full justify-start"
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
