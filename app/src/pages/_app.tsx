import "@/styles/globals.css";
import "@vscode/codicons/dist/codicon.css";
import "@codepp/ui/css";
import { type IWithHooks, withHooks, HooksProviders } from "@codepp/hooks";
import NextApp, { type AppProps as NextAppProps } from "next/app";

interface AppProps extends NextAppProps, IWithHooks {}

function App({
  Component,
  pageProps,
  virtualAppState,
  cookies,
  userAgent,
}: AppProps) {
  const theme = virtualAppState.theme;
  return (
    <HooksProviders pageProps={pageProps} virtualAppState={virtualAppState}>
      <Component theme={theme} />
    </HooksProviders>
  );
}

export default withHooks(App as unknown as typeof NextApp);
