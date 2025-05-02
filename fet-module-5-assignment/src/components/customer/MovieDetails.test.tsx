import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieDetails from "./MovieDetails";
import Movie from "@/interfaces/Movie";

const mockMovie: Movie = {
  id: 1,
  name: "Test Movie",
  genre: "Test Genre",
  studio: "Test Studio",
  studioId: 1,
  genreId: 1,
  ticketPrice: 12.5,
  reviews: [],
  actor: [],
};

describe("MovieDetails", () => {
  it("renders movie details correctly", () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();

    // Check Genre
    expect(
      screen.getByText((_, node) => node !== null && node.textContent === "Genre: Test Genre")
    ).toBeInTheDocument();

    // Check Studio
    expect(
      screen.getByText((_, node) => node !== null && node.textContent === "Studio: Test Studio")
    ).toBeInTheDocument();

    // Check Ticket Price
    expect(
      screen.getByText((_, node) =>
        node !== null && node.textContent !== null && node.textContent.replace(/\s+/g, " ").trim() === "Ticket Price: $12.5"
      )
    ).toBeInTheDocument();
  });
});