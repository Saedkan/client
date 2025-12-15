'use client';

import React from 'react';
import { useCartStore } from '@/stores/cart.store';

interface AddToCartButtonProps {
  manga: {
    id: string;
    title: string;
    price: number;
    stock: number;
  };
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ manga }) => {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const inCart = items.find((i) => i.mangaId === manga.id);

  const handleAdd = () => {
    if (manga.stock === 0) return;
    if (inCart) {
      // увеличиваем количество
      addItem({ ...inCart, quantity: inCart.quantity + 1 });
    } else {
      addItem({
        mangaId: manga.id,
        title: manga.title,
        price: manga.price,
        quantity: 1,
      });
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={manga.stock === 0}
      className={`px-4 py-2 rounded-md font-semibold text-white ${
        manga.stock === 0
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {inCart ? 'Add Another' : 'Add to Cart'}
    </button>
  );
};
