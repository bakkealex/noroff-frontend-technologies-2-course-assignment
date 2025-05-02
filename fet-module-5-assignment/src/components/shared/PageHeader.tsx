import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <nav className="flex gap-6 items-center">
        <Link href="/" className="font-bold text-xl hover:text-orange-300">
          Movie Theatre
        </Link>
        <Link href="/admin" className="hover:text-orange-300">
          Admin
        </Link>
      </nav>
    </header>
  );
}