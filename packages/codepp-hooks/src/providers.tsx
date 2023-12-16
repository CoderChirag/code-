import {
  ThemeProvider,
  type ITheme,
  defaultThemes,
  buildTheme,
} from "@codepp-ui/theme";
import { type FC, type PropsWithChildren } from "react";
import { PagePropsProvider } from "./hooks/page-props";
import NextApp, { type AppInitialProps, type AppContext } from "next/app";
import axios from "axios";

interface IHooksProviderProps {
  theme: ITheme;
  pageProps: Record<string, any>;
}

export const HooksProviders: FC<PropsWithChildren<IHooksProviderProps>> = ({
  children,
  theme,
  pageProps,
}) => {
  return (
    <>
      <ThemeProvider initialTheme={theme}>
        <PagePropsProvider value={pageProps}>{children}</PagePropsProvider>
      </ThemeProvider>
    </>
  );
};

export interface IWithHooks {
  theme: ITheme;
  cookies: Record<string, any>;
  userAgent: string | undefined;
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

    let theme: ITheme = defaultThemes.defaultDark;

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
        theme = JSON.parse(data);
      } catch (e) {}
    }

    const data: IWithHooks = {
      cookies,
      userAgent,
      theme: buildTheme(defaultThemes.defaultDark),
    };
    if (getInitialProps) {
      const appProps = await getInitialProps(appContext);
      Object.assign(data, appProps);
    }
    return data as unknown as AppInitialProps;
  };
  return App;
}
