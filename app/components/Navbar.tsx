'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const { user, clearAuth } = useAuthStore();
  const { items } = useCartStore();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/" className="font-bold text-lg">
          Anime Shop
        </Link>
        <Link href="/mangas" className="hover:underline">
          Catalog
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/cart" className="relative hover:underline">
          Cart
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {items.length}
            </span>
          )}
        </Link>

        {!user && (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link href="/profile" className="hover:underline">
              {user.name}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
