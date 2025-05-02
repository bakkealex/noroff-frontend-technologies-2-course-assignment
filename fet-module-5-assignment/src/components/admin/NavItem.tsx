import Link from "next/link";
import NavItemProps from "@/interfaces/NavItemProps";

export default function NavItem({ href, isActive, children }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`block btn-big hover:bg-orange-500 ${isActive ? "bg-orange-400" : "bg-transparent"} text-white`}
      >
        {children}
      </Link>
    </li>
  )
}