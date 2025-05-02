import AdminMiscItem from "@/interfaces/AdminMiscItem";
export default interface AdminListProps {
  item: AdminMiscItem;
  resource: string; // "genres", "actors", "studios"
  onDelete: (id: number) => void;
  error: string | null;
}