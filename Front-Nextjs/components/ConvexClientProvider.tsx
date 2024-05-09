"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const convex = new ConvexReactClient("https://ardent-retriever-925.convex.cloud");

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Auth0Provider
      domain="https://dev-0gtwzsux0to2yy8t.us.auth0.com"
      clientId="fVgo8ETCPFeAqlObPieTaS3VnNYpe9gF"
      authorizationParams={{
        redirect_uri: "http://localhost:3000"
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <ConvexProviderWithAuth0 client={convex}>
        {children}
      </ConvexProviderWithAuth0>
    </Auth0Provider>
  );
}