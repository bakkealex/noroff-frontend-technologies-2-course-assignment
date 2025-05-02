"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import NavList from "@/components/admin/NavList";
import NavItem from "@/components/admin/NavItem";

export default function AdminHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Admin Dashboard" },
    { href: "/admin/movies", label: "Movies" },
    { href: "/admin/actors", label: "Actors" },
    { href: "/admin/genres", label: "Genres" },
    { href: "/admin/studios", label: "Studios" },
  ];

  return (
    <header className="bg-gray-900 bg-opacity-70 text-white sticky top-10 z-50">
      <div className="flex justify-end items-center px-4 py-2 sm:hidden">
        <button
          className="p-2 focus:outline-none"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      <nav
        className={`
          ${isOpen ? "flex" : "hidden"}
          flex-col
          sm:flex sm:flex-row
          bg-gray-900 bg-opacity-90 px-4 pb-2 sm:pb-0
          transition-all duration-200
        `}
      >
        <NavList className="flex flex-col sm:flex-row gap-2">
          {navItems.map((item) => (
            <NavItem href={item.href} isActive={pathname === item.href} key={item.href}>
              {item.label}
            </NavItem>
          ))}
        </NavList>
      </nav>
    </header>
  );
}