'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/auth.store';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="flex justify-between p-4 bg-gray-900 text-white">
      <Link href="/">AnimeManga</Link>
      <div className="space-x-4">
        <Link href="/cart">Cart</Link>
        {user ? (
          <>
            <Link href="/profile">{user.name}</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
