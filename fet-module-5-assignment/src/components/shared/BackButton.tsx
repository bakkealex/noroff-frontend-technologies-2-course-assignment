import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="btn-big btn-gray w-full mt-2"
      type="button"
      onClick={() => router.back()}
    >
      Go back
    </button>
  );
}