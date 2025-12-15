'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import useSubscription from '@apollo/client';
import React from 'react';
import { OrderStatus } from '@/components/OrderStatus';

const GET_ORDERS = gql`
  query GetMyOrders {
    getMyOrders {
      id
      status
      totalPrice
      items {
        mangaId
        quantity
        priceAtPurchase
      }
      createdAt
    }
  }
`;

const ORDER_UPDATED = gql`
  subscription OnOrderStatusUpdated($orderId: ID!) {
    orderStatusUpdated(orderId: $orderId) {
      id
      status
    }
  }
`;

export default function AdminOrdersPage() {
  const { data, loading, error, refetch } = useQuery(GET_ORDERS);

  useSubscription(ORDER_UPDATED, {
    onData: ({ data: subData }: { data?: { orderStatusUpdated: { id: string; status: string } } }) => {
      const updatedOrder = subData?.orderStatusUpdated;
      console.log('Order updated:', updatedOrder);
      refetch(); // простое обновление списка
    },
  });

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>
      {data.getMyOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {data.getMyOrders.map((order: any) => (
            <li key={order.id} className="border p-4 rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold">Order ID: {order.id}</p>
                <p>Total: ${order.totalPrice}</p>
                <p>Items: {order.items.length}</p>
                <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <OrderStatus status={order.status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
