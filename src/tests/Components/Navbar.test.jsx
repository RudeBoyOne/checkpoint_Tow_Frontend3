import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar"
import LoginProvider from "../../Providers/ProviderLogin";
import ThemeProvider from "../../Providers/ProviderTheme";

describe("testando algumas funções do componente Navbar", () => {
    test("verifica se o componente está no theme light", () => {
        render(
            <BrowserRouter>
                <LoginProvider>
                    <ThemeProvider>
                        <Navbar />
                    </ThemeProvider>
                </LoginProvider>
            </BrowserRouter>
        );
        
        const navbar = screen.getByLabelText("navbar", {name:"Third navbar example"});
        
        expect(navbar).toHaveClass("navbar-light");
        expect(navbar).toHaveClass("bg-light");
    });
    
    test("muda tema da navbar e verifica se a mesma está com theme dark", () => {
        render(
            <BrowserRouter>
                <LoginProvider>
                    <ThemeProvider>
                        <Navbar />
                    </ThemeProvider>
                </LoginProvider>
            </BrowserRouter>
        );
        
        const navbar = screen.getByLabelText("navbar", {name:"Third navbar example"});
        const buttonTheme = screen.getByRole("button", { name: "🌙"})
        
        act(() => {
            buttonTheme.click();
        })

        expect(navbar).toHaveClass("navbar-dark");
        expect(navbar).toHaveClass("bg-dark");
    })
})