'use client';

import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/auth.store';

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION);

  const { register, handleSubmit } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    const res = await registerMutation({ variables: data });

    setAuth(
      res.data.register.user,
      res.data.register.token
    );

    router.push('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-3 border p-4 rounded"
    >
      <input {...register('email')} placeholder="Email" className="input" />
      <input {...register('name')} placeholder="Name" className="input" />
      <input {...register('password')} type="password" placeholder="Password" className="input" />

      <button disabled={loading} className="btn w-full">
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}


