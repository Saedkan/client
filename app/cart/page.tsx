'use client';

import { useCartStore } from "@/stores/cart.store";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const total = items.reduce((acc, it) => acc + it.price * it.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {items.length === 0 ? (
        <p>Корзина пуста.</p>
      ) : (
        <div>
          <ul>
            {items.map((it) => (
              <li key={it.mangaId} className="mb-2">
                {it.title} — {it.quantity} × ${it.price}
              </li>
            ))}
          </ul>
          <p className="font-bold mt-4">Total: ${total}</p>
        </div>
      )}
    </div>
  );
}
