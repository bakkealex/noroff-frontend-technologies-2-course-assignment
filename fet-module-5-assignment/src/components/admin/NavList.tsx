export default function NavList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <nav className="py-2 px-6 text-sm font-medium">
      <ul className={`flex flex-col sm:flex-row gap-2 sm:gap-4 ${className}`}>
        {children}
      </ul>
    </nav>
  );
}