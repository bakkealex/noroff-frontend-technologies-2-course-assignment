"use client";

import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">404</h1>
      <h2 className="text-center mb-4">This page could not be found!</h2>
      <Image
        src="/placeholder.png"
        alt="404 Not Found"
        width={500}
        height={500}
        className="mb-4 drop-shadow-lg object-contain rounded-xl"
        priority
      />
      <button
        className="btn-big btn-orange"
        onClick={() => window.location.href = '/'}
      >
        Go to Home
      </button>
    </div>
  );
}