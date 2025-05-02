export default interface MovieFormProps {
  initialValues?: {
    name: string;
    ticketPrice: number;
    studioId?: number;
    genreId?: number;
  };
  onSubmit: (data: {
    name: string;
    ticketPrice: number;
    studioId: number;
    genreId: number;
  }) => Promise<void>;
  submitting: boolean;
  error?: string | null;
}