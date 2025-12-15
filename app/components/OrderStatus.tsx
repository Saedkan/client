'use client';

import React from 'react';

interface OrderStatusProps {
  status: 'PENDING' | 'PAID' | 'SHIPPED';
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  let bgColor = 'bg-gray-300';
  if (status === 'PAID') bgColor = 'bg-blue-400';
  if (status === 'SHIPPED') bgColor = 'bg-green-500';

  return (
    <span
      className={`px-3 py-1 rounded-full text-white font-semibold ${bgColor}`}
    >
      {status}
    </span>
  );
};
