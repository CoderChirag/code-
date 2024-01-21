import App from "@/components/app/app";
import { buildCSSVars, buildFontImports } from "@codepp/hooks/utils";
import { ITheme } from "@codepp/theme";
import Head from "next/head";

interface PageProps {
  theme: ITheme;
}

export default function Home({ theme }: PageProps) {
  const colors = buildCSSVars(theme.colors as Record<string, any>, "theme");
  const fonts = buildCSSVars(theme.fonts as Record<string, any>, "theme-font");
  const fontImports = buildFontImports(theme.fonts.urls);

  return (
    <>
      <Head>
        <title>Code++</title>
        <meta
          name="description"
          content="A cool looking Web based Code Editor."
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="app-container">
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
        <App />
      </div>
    </>
  );
}
