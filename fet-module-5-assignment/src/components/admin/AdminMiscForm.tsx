import { useState } from "react";
import AdminMiscItemFormProps from "@/interfaces/AdminMiscItemFormProps";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function AdminMiscForm({
  label,
  initialValues,
  onSubmit,
  submitting,
  error,
}: AdminMiscItemFormProps) {
  const [name, setName] = useState(initialValues?.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">
          {label.charAt(0).toUpperCase() + label.slice(1)} name
        </label>
        <input
          type="text"
          className="w-full p-2 rounded border input-color-fix"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      {error && <ErrorMessage message={error} />}
      <button
        type="submit"
        className="btn-big w-full btn-orange"
        disabled={submitting}
      >
        {submitting ? "Saving..." : `Save ${label}`}
      </button>
    </form>
  );
}