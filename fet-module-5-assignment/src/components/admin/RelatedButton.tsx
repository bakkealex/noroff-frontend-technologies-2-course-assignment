import Link from "next/link";
import React from "react";
import RelatedButtonProps from "@/interfaces/RelatedButtonProps";

export default function RelatedButton({ href, children }: RelatedButtonProps) {
  return (
    <Link
      href={href}
      className="block btn btn-gray px-4 py-2 text-sm text-center font-semibold"
    >
      {children}
    </Link>
  );
}