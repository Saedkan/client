'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const FAVORITES_QUERY = gql`
  query {
    me {
      favorites {
        id
        title
        coverImage
        price
      }
    }
  }
`;

export default function FavoritesPage() {
  const { data, loading } = useQuery(FAVORITES_QUERY);

  if (loading) return <p>Loading...</p>;

  const favorites = data?.me?.favorites ?? [];

  return (
    <div>
      <h1>❤️ Избранное</h1>

      {favorites.length === 0 && <p>Пусто</p>}

      <div>
        {favorites.map((m: any) => (
          <div key={m.id}>
            <img src={m.coverImage} width={120} />
            <h3>{m.title}</h3>
            <p>{m.price} $</p>
          </div>
        ))}
      </div>
    </div>
  );
}
