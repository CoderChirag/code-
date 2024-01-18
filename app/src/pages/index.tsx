import App from "@/components/app/app";
import { useTheme } from "@codepp/hooks";
import { buildCSSVars, buildFontImports } from "@codepp/theme";

export default function Home() {
  const theme = useTheme();

  const colors = buildCSSVars(theme.colors as Record<string, any>, "theme");
  const fonts = buildCSSVars(theme.fonts as Record<string, any>, "theme-font");
  const fontImports = buildFontImports(theme.fonts.urls);

  return (
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
  );
}
