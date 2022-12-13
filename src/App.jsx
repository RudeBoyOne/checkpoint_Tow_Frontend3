
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import ThemeProvider from "./Providers/ProviderTheme";
import LoginProvider from "./Providers/ProviderLogin";

function App() {
  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={`app light}`}>
        <ThemeProvider>
          <LoginProvider>
            <Navbar />
            <main>
              <Outlet />
            </main>
            <Footer />
          </LoginProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
