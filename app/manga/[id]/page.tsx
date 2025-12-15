import { gql } from '@apollo/client';
import useQuery from '@apollo/client';
import { notFound } from 'next/navigation';
import React from 'react';
import { AddToCartButton } from '../../components/AddToCartButton';

const GET_MANGA = gql`
  query GetMangaById($id: ID!) {
    getMangaById(id: $id) {
      id
      title
      description
      price
      stock
      genres
      coverImage
      rating
      reviews {
        id
        rating
        comment
        user {
          id
          name
        }
      }
    }
  }
`;

interface MangaPageProps {
  params: { id: string };
}

export default function MangaPage({ params }: MangaPageProps) {
  const { data, loading, error } = useQuery(GET_MANGA, { variables: { id: params.id } });

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error.message}</p>;
  if (!data?.getMangaById) notFound();

  const manga = data.getMangaById;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={manga.coverImage} alt={manga.title} className="w-full md:w-64 h-auto rounded-lg" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{manga.title}</h1>
          <p className="text-gray-600 mt-2">{manga.description}</p>
          <p className="mt-4 font-semibold">Price: ${manga.price}</p>
          <p className="mt-2">Stock: {manga.stock}</p>
          <p className="mt-2">Genres: {manga.genres.join(', ')}</p>
          <p className="mt-2">Rating: {manga.rating?.toFixed(1)}</p>
          <div className="mt-4">
            <AddToCartButton manga={manga} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {manga.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {manga.reviews.map((rev: any) => (
              <li key={rev.id} className="border p-4 rounded-md">
                <p className="font-semibold">{rev.user?.name || 'Anonymous'}</p>
                <p>Rating: {rev.rating}</p>
                <p>{rev.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
