import { type FC, type PropsWithChildren } from "react";
import { PagePropsProvider } from "./page-props";
import NextApp, { type AppInitialProps, type AppContext } from "next/app";
import axios from "axios";
import { virtualAppState as defaultVirtualAppState } from "../defaults/virtual-app";

import { VirtualAppProvider } from "./virtual-app";
import { VirtualAppState } from "..";

interface IHooksProviderProps {
  pageProps: Record<string, any>;
  virtualAppState: VirtualAppState;
}

export const HooksProviders: FC<PropsWithChildren<IHooksProviderProps>> = ({
  children,
  pageProps,
  virtualAppState,
}) => {
  return (
    <>
      <VirtualAppProvider initialAppState={virtualAppState}>
        <PagePropsProvider value={pageProps}>{children}</PagePropsProvider>
      </VirtualAppProvider>
    </>
  );
};

export interface IWithHooks {
  cookies: Record<string, any>;
  userAgent: string | undefined;
  virtualAppState: VirtualAppState;
}

export function withHooks(App: typeof NextApp) {
  const { getInitialProps } = App;
  App.getInitialProps = async (appContext) => {
    const userAgent = appContext.ctx?.req?.headers["user-agent"];
    const cookies = (
      appContext as AppContext & {
        ctx: { req: { cookies: Record<string, any> } };
      }
    ).ctx?.req?.cookies;

    if (cookies && cookies?.["X-SESSION-ID"]) {
      const sessionId = cookies["X-SESSION-ID"];
      try {
        const { data } = await axios.get<string>(
          `${process.env.REDIS_URL}/get/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REDIS_TOKEN}`,
            },
          }
        );
        // theme = ;
      } catch (e: any) {
        console.error(
          `error fetching session data with session id: ${sessionId}`,
          e.message
        );
      }
    }

    const data: IWithHooks = {
      cookies,
      userAgent,
      virtualAppState: defaultVirtualAppState,
    };
    if (getInitialProps) {
      const appProps = await getInitialProps(appContext);
      Object.assign(data, appProps);
    }
    return data as unknown as AppInitialProps;
  };
  return App;
}
