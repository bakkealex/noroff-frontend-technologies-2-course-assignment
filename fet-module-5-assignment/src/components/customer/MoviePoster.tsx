import Image from "next/image";

export default function MoviePoster() {
  return (
    <Image
      src="/placeholder.png"
      alt="Movie Poster"
      width={270}
      height={400}
      className="rounded shadow object-cover"
      priority
    />
  );
}