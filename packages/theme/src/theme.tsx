import {
  type FC,
  type PropsWithChildren,
  createContext,
  useState,
  memo,
  useContext,
} from "react";
import { type ThemeContextType, type ITheme } from "./types";

const ThemeContext = createContext<ThemeContextType>({
  name: "",
  theme: {} as ITheme,
  setTheme: () => void 0,
});

export const useTheme = () => {
  const { name, theme, setTheme } = useContext(ThemeContext);
  return { name, theme, setTheme };
};

const TP: FC<PropsWithChildren<{ initialTheme: ITheme }>> = ({
  children,
  initialTheme,
}) => {
  const [theme, setTheme] = useState(initialTheme);
  const name = theme.name;

  return (
    <ThemeContext.Provider value={{ name, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeProvider = memo(TP);
