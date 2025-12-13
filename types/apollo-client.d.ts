declare module '@apollo/client' {
  import * as React from 'react';
  export const ApolloClient: any;
  export const InMemoryCache: any;
  export const HttpLink: any;
  export const split: any;
  export const gql: any;
  export const getMainDefinition: any;
  export default any;
}

declare module '@apollo/client/react' {
  import * as React from 'react';
  export const ApolloProvider: React.ComponentType<{ client: any; children?: React.ReactNode }>;
  export function useQuery(...args: any[]): any;
  export function useMutation(...args: any[]): any;
}

declare module '@apollo/client/react/hooks' {
  export function useQuery(...args: any[]): any;
  export function useMutation(...args: any[]): any;
}
