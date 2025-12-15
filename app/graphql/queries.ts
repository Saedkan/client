import { gql } from '@apollo/client';

export const GET_MANGAS = gql`
  query {
    getMangas {
      id
      title
      price
      genres
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      name
      email
      role
    }
  }
`;

export const MY_ORDERS_QUERY = gql`
  query MyOrders {
    getMyOrders {
      id
      status
      totalPrice
      createdAt
      items {
        quantity
        priceAtPurchase
        manga {
          id
          title
          coverImage
        }
      }
    }
  }
`;

export const SEARCH_MANGA_QUERY = gql`
  query SearchManga($search: String) {
    mangas(filter: { search: $search }) {
      id
      title
      coverImage
      price
    }
  }
`;