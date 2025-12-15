'use client';

import { useState } from 'react';
import { GET_MANGAS } from '@/graphql/queries';
import { useLazyQuery } from '@apollo/client';
import MangaCard from './MangaCard';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchMangas, { data, loading, error }] = useLazyQuery(GET_MANGAS);

  const handleSearch = () => {
    searchMangas({ variables: { query } });
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск манги..."
        className="border p-2 rounded w-full"
      />
      <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
        Поиск
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="grid grid-cols-3 gap-4 mt-4">
        {data?.getMangas?.map((manga: any) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </div>
  );
}

