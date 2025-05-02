"use client";

export default function BackButtonClientSided() {
  return (
    <button
      className="btn-big btn-gray w-full mt-2"
      type="button"
      onClick={() => window.history.back()}
    >
      Go back
    </button>
  );
}