'use client';

import { useCartStore } from '@/stores/cart.store';

export default function MangaCard({ manga }: any) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="border rounded p-4">
      <h2 className="font-bold">{manga.title}</h2>
      <p>${manga.price}</p>
      <button
        className="mt-2 bg-black text-white px-3 py-1"
        onClick={() =>
          addItem({
            mangaId: manga.id,
            title: manga.title,
            price: manga.price,
            quantity: 1,
          })
        }
      >
        Add to cart
      </button>
    </div>
  );
}
