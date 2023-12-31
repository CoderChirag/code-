import { ThemeProvider, type ITheme, ThemeBuilder } from "@codepp/theme";
import { type FC, type PropsWithChildren } from "react";
import { PagePropsProvider } from "./hooks/page-props";
import NextApp, { type AppInitialProps, type AppContext } from "next/app";
import axios from "axios";
import {
  type IActionItems,
  actionItems as defaultActionItems,
} from "./defaults/action-items";
import { ActionItemsProvider } from "./hooks/action-items";

interface IHooksProviderProps {
  theme: ITheme;
  pageProps: Record<string, any>;
  actionItems: IActionItems;
}

export const HooksProviders: FC<PropsWithChildren<IHooksProviderProps>> = ({
  children,
  theme,
  pageProps,
  actionItems,
}) => {
  return (
    <>
      <ThemeProvider initialTheme={theme}>
        <ActionItemsProvider actionItems={actionItems}>
          <PagePropsProvider value={pageProps}>{children}</PagePropsProvider>
        </ActionItemsProvider>
      </ThemeProvider>
    </>
  );
};

export interface IWithHooks {
  theme: ITheme;
  cookies: Record<string, any>;
  userAgent: string | undefined;
  actionItems: IActionItems;
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

    let theme: ITheme = new ThemeBuilder("dark").getTheme();

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
      theme,
      actionItems: defaultActionItems,
    };
    if (getInitialProps) {
      const appProps = await getInitialProps(appContext);
      Object.assign(data, appProps);
    }
    return data as unknown as AppInitialProps;
  };
  return App;
}
