'use client';

import { useMutation } from '@apollo/client/react';
import { LOGIN } from '@/graphql/mutations';
import { useAuthStore } from '@/stores/auth.store';

export default function LoginPage() {
  const loginStore = useAuthStore();
  const [login] = useMutation(LOGIN);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;

    const res = await login({
      variables: {
        email: form.email.value,
        password: form.password.value,
      },
    });

    loginStore.login(
      res.data.login.token,
      res.data.login.user
    );
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-4">
      <input name="email" placeholder="Email" className="border p-2 w-full" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
      />
      <button className="bg-black text-white px-4 py-2 w-full">
        Login
      </button>
    </form>
  );
}
