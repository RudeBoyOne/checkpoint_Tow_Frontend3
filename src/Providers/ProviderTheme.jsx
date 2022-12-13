import { createContext, useState } from "react";

export const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);

  function handleTheme() {
    setTheme(!theme)
  }

  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;