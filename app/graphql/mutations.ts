import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        role
      }
    }
  }
`;

export const ALL_ORDERS_QUERY = gql`
  query AllOrders($status: OrderStatus) {
    getAllOrders(status: $status) {
      id
      status
      totalPrice
      createdAt
      user {
        email
        name
      }
      items {
        quantity
        priceAtPurchase
        manga {
          title
        }
      }
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      id
      status
    }
  }
`;