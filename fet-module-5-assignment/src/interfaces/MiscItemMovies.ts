import AdminMiscItem from "@/interfaces/AdminMiscItem";
import MiscItemMovie from "@/interfaces/MiscItemMovie";

export default interface MiscItemMovies extends AdminMiscItem {
  movies: MiscItemMovie[];
}