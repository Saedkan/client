'use client';

import { useQuery } from '@apollo/client/react';
import { MY_ORDERS_QUERY } from '@/graphql/queries';

export default function OrdersPage() {
  const { data, loading } = useQuery(MY_ORDERS_QUERY);

  if (loading) return <p>Загрузка...</p>;

  const orders = data?.getMyOrders ?? [];

  return (
    <div>
      <h1>📦 История заказов</h1>

      {orders.length === 0 && <p>У вас пока нет заказов</p>}

      {orders.map((order: any) => (
        <div key={order.id} style={{ border: '1px solid #ddd', marginBottom: 16, padding: 16 }}>
          <div>
            <strong>Статус:</strong> {order.status}
          </div>
          <div>
            <strong>Дата:</strong>{' '}
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Сумма:</strong> {order.totalPrice} $
          </div>

          <ul>
            {order.items.map((item: any, idx: number) => (
              <li key={idx} style={{ display: 'flex', gap: 12 }}>
                <img src={item.manga.coverImage} width={60} />
                <div>
                  <div>{item.manga.title}</div>
                  <div>
                    {item.quantity} × {item.priceAtPurchase} $
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
