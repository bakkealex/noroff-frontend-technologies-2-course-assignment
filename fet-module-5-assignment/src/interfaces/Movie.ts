import Review from "@/interfaces/Review";
import AdminMiscItem from "@/interfaces/AdminMiscItem";

export default interface Movie {
  id: number;
  name: string;
  genre: string;
  genreId: number;
  studio: string;
  studioId: number;
  ticketPrice: number;
  reviews: Review[];
  actor: AdminMiscItem[];
}