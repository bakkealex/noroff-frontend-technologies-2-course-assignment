"use client";

import Image from "next/image";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Oops</h1>
      <h2 className="text-center mb-4">Something went wrong!</h2>
      <Image
        src="/error.png"
        alt="Error"
        width={500}
        height={500}
        className="mb-4 drop-shadow-lg object-contain rounded-xl"
        priority
      />
      <button
        className="btn-big btn-orange"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}