import { gql } from '@apollo/client';

export const ORDER_STATUS_SUB = gql`
  subscription OrderStatusUpdated($orderId: ID!) {
    orderStatusUpdated(orderId: $orderId) {
      id
      status
    }
  }
`;
