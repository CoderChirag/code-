import "@/styles/globals.css";
import { buildCSSVars, defaultThemes } from "@codepp-ui/theme";
import { type IWithHooks, withHooks, HooksProviders } from "@codepp/hooks";
import { Global, css } from "@emotion/react";
import NextApp, { type AppProps as NextAppProps } from "next/app";

interface AppProps extends NextAppProps, IWithHooks {}

function App({ Component, pageProps, theme, cookies, userAgent }: AppProps) {
  const css = buildCSSVars(theme.colors as Record<string, any>, "theme");
  console.log(css);
  return (
    <HooksProviders theme={theme} pageProps={pageProps}>
      <style global jsx>
        {`
          :root {
            ${css}
          }
        `}
      </style>
      <Component theme={theme} />;
    </HooksProviders>
  );
}

export default withHooks(App as unknown as typeof NextApp);
