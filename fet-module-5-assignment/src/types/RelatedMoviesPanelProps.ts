import MiscItemMovie from "@/interfaces/MiscItemMovie";
// Using type instead of interface because of union type
export type RelatedMoviesPanelProps = {
  loading: boolean;
  entity:
  | { type: "actor"; movies?: MiscItemMovie[] }
  | { type: "genre"; movies?: MiscItemMovie[] }
  | { type: "studio"; movies?: MiscItemMovie[] }
  | null;
  initialValues: { name: string } | null;
};