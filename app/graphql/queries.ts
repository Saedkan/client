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
