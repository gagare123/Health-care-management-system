"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import PasskeyModal from "@/components/PasskeyModal";

export default function Navbar() {
  const pathname = usePathname();
  const match = pathname.match(/patients\/([^/]+)/);
  const userId = match ? match[1] : "6915eb0900364c265e8f";

  const [menuOpen, setMenuOpen] = useState(false);
  const [showPasskeyModal, setShowPasskeyModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Admin", requiresPasskey: true },
    { href: `/patients/${userId}/register`, label: "Register" },
    { href: `/patients/${userId}/new-appointment`, label: "Appointment" },
  ];

  // Parent route matching
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/admin") return pathname === "/admin";
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

  const handleLinkClick = (
    e: React.MouseEvent,
    link: { href: string; label: string; requiresPasskey?: boolean }
  ) => {
    if (link.requiresPasskey) {
      e.preventDefault();
      setShowPasskeyModal(true);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 border-b border-border bg-background sticky top-0 z-50">
        <p className="text-2xl font-semibold">Health Care Management </p>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
            >
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
                  onClick={(e) => {
                    handleLinkClick(e, link);
                    if (!link.requiresPasskey) setMenuOpen(false);
                  }}
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

      {/* Passkey Modal */}
      <PasskeyModal
        isOpen={showPasskeyModal}
        onClose={() => setShowPasskeyModal(false)}
      />
    </>
  );
}
