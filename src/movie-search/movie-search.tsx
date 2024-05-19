import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { ApiClient } from './services';

const tmdbClient = new ApiClient();

function MovieSearchInner({ query }: { query: string }) {
  const { status, data, error } = useQuery({
    queryKey: ['movieSearch', query],
    queryFn: async ({ signal }) => tmdbClient.searchMovies(query, signal),
  });

  switch (status) {
    case 'pending':
      return 'Loading';
    case 'error':
      return `Failed loading search results: ${error.message}`;
    case 'success':
      return JSON.stringify(data);
  }
}

function MovieSearch() {
  const [query, setQuery] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setQuery(inputRef.current?.value ?? '');
  };

  return (
    <div>
      <h1>Movie search</h1>
      <div>
        <input type="text" ref={inputRef} />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {query ? <MovieSearchInner query={query} /> : ''}
    </div>
  );
}

export { MovieSearch };
