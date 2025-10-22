import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }

  const { year, page, genre } = request.body;
  const date = new Date();
  const genreQuery = genre && genre !== "All" ? `&genre=${genre}` : '';

  try {
    const resp = await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles?year=${year || date.getFullYear()}&sort=year.decr&limit=12&page=${page}${genreQuery}`,
      {
        headers: {
          "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
          "x-rapidapi-key": process.env.MOVIE_API_KEY!,
        },
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Movies API error:", text);
      return response.status(resp.status).json({ error: text });
    }

    const moviesResponse = await resp.json();
    const movies: MoviesProps[] = moviesResponse.results || [];

    return response.status(200).json({ movies });
  } catch (error: unknown) {
    console.error("Fetch movies failed:", error.message);
    return response.status(500).json({ error: error.message });
  }
}
