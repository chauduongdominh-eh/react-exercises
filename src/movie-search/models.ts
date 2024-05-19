import { z } from 'zod';

function snakeToCamel(name: string): string {
  const words = name.split('_').filter((word) => word !== '');
  return [
    words[0],
    ...words
      .slice(1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
  ].join('');
}

function camelKeys(o: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(o).map(([k, v]) => [snakeToCamel(k), v]),
  );
}

const MovieSearchResult = z
  .object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string().transform((x) => new Date(x)),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
  })
  .transform(camelKeys);

const MovieSearchResponse = z
  .object({
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
    results: z.array(MovieSearchResult),
  })
  .transform(camelKeys);

export { MovieSearchResponse, MovieSearchResult };
