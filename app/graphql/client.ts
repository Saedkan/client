'use client';

import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// Берём значения из env (Next инлайнит их при сборке). Для разработки — fallback.
const GRAPHQL_HTTP = process.env.NEXT_PUBLIC_GRAPHQL_HTTP ?? 'http://localhost:4000/graphql';
const GRAPHQL_WS = process.env.NEXT_PUBLIC_GRAPHQL_WS ?? 'ws://localhost:4000/graphql';

if (!process.env.NEXT_PUBLIC_GRAPHQL_HTTP) {
  console.warn(
    '[client] NEXT_PUBLIC_GRAPHQL_HTTP not set — using fallback',
    GRAPHQL_HTTP
  );
}

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP,
  credentials: 'include',
});

const wsLink =
  typeof window !== 'undefined' && typeof WebSocket !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: GRAPHQL_WS,
        })
      )
    : null;

const splitLink =
  typeof window !== 'undefined' && wsLink
    ? split(
        ({ query }: { query: any }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === 'OperationDefinition' &&
            def.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});