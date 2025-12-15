'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gql, useMutation } from '@apollo/client';

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($name: String!, $password: String) {
    updateProfile(name: $name, password: $password) {
      id
      name
      email
    }
  }
`;

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(6).optional(),
});

type ProfileInput = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { user, setAuth } = useAuthStore();
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE_MUTATION);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, setValue, formState } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProfileInput) => {
    try {
      const res = await updateProfile({ variables: data });
      setAuth(res.data.updateProfile, localStorage.getItem('token') || '');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!user) return <p className="p-6">Please login to view your profile.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      {success && <p className="text-green-600 mb-2">Profile updated successfully!</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('name')}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          {...register('password')}
          type="password"
          placeholder="New Password (optional)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
      <div className="mt-4 text-gray-700">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default ProfilePage;


