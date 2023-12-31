import "@/styles/globals.css";
import { buildCSSVars, buildFontImports } from "@codepp/theme";
import { type IWithHooks, withHooks, HooksProviders } from "@codepp/hooks";
import NextApp, { type AppProps as NextAppProps } from "next/app";

interface AppProps extends NextAppProps, IWithHooks {}

function App({ Component, pageProps, theme, cookies, userAgent }: AppProps) {
  const colors = buildCSSVars(theme.colors as Record<string, any>, "theme");
  const fonts = buildCSSVars(theme.fonts as Record<string, any>, "theme-font");
  const fontImports = buildFontImports(theme.fonts.urls);
  return (
    <HooksProviders theme={theme} pageProps={pageProps}>
      <style global jsx>{`
        ${fontImports}
      `}</style>
      <style global jsx>
        {`
          :root {
            ${colors}
            ${fonts}
          }
        `}
      </style>
      <Component theme={theme} />
    </HooksProviders>
  );
}

export default withHooks(App as unknown as typeof NextApp);
