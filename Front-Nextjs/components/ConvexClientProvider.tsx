"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { Auth0Provider } from "@auth0/auth0-react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Auth0Provider
      domain="dev-0gtwzsux0to2yy8t.us.auth0.com"
      clientId="fVgo8ETCPFeAqlObPieTaS3VnNYpe9gF"
      authorizationParams={{
        redirect_uri: 'http://localhost:3000'
      }}
      useRefreshTokens={false}
      cacheLocation="localstorage"
      >
      <ConvexProviderWithAuth0 client={convex}>
        {children}
      </ConvexProviderWithAuth0>
    </Auth0Provider>
  );
}