// This is an interface for Actors, Studios, and Genres forms in the admin panel.
export default interface AdminMiscItemFormProps {
  label: string;
  initialValues?: { name: string };
  onSubmit: (data: { name: string }) => Promise<void>;
  submitting: boolean;
  error?: string | null;
}