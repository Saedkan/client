'use client';

import { useQuery } from '@apollo/client/react';
import { ME } from '@/graphql/queries';

export default function ProfilePage() {
  const { data } = useQuery(ME);

  if (!data) return null;

  return (
    <div>
      <h1 className="text-xl font-bold">{data.me.name}</h1>
      <p>{data.me.email}</p>
      <p>{data.me.role}</p>
    </div>
  );
}
