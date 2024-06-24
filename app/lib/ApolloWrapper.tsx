"use client";

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
// @ts-ignore
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const uploadLink = createUploadLink({ 
  uri: "http://localhost:3000/graphql",
  headers: {
    "Apollo-Require-Preflight": "true"
  }
});

function makeClient() {
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link: authLink.concat(uploadLink),
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}