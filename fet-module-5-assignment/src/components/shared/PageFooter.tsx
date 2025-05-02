export default function PageFooter() {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center mt-auto">
      &copy; {new Date().getFullYear()} Movie Theatre. All rights reserved.
    </footer>
  );
}