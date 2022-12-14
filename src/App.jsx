
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { ThemeContext } from "./Providers/ProviderTheme"
import { useContext } from "react";
import { useEffect } from "react";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`
              ${theme ? "dark" : ""}
            `} >
        <Navbar />
        <main >
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
