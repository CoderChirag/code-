import {
  type FC,
  type PropsWithChildren,
  createContext,
  useState,
  memo,
} from "react";
import { type ThemeContextType, type ITheme } from "./types";

export const ThemeContext = createContext<ThemeContextType>({
  theme: {} as ITheme,
  setTheme: () => void 0,
});

const TP: FC<PropsWithChildren<{ initialTheme: ITheme }>> = ({
  children,
  initialTheme,
}) => {
  const [theme, setTheme] = useState(initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeProvider = memo(TP);
