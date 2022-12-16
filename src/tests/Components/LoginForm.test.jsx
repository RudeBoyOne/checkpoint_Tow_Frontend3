import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../../Components/LoginForm/LoginForm"
import LoginContext from "../../Providers/ProviderLogin"
const { render, screen, fireEvent } = require("@testing-library/react");

describe("testando algumas funções do componente LoginForm", () => {
    test("Verificando Título page Login", () => {
        render( <LoginForm />, {wrapper: BrowserRouter});

        const componente = screen.getByText("Login");

        expect(componente).toBeInTheDocument();
    });

    test("Validação do formulário de login", async () => {
        render( <LoginForm />, {wrapper: BrowserRouter});
        
        const buttonSubmit = screen.getByRole('button', { name: "Send" });
        
        act(() => {
            buttonSubmit.click();
        });
        
        
        expect(await screen.findByText("Erro. Por favor, verifique os dados inseridos no formulário")).toBeVisible();
    });
    
    test("Falha na requisição de login com dados de um usuário inválido", async () => {
        render( <LoginForm />, {wrapper: BrowserRouter});
        
        const userLogin = screen.getByLabelText("login")
        const userPassword = screen.getByLabelText("password")
        const buttonSubmit = screen.getByRole('button', { name: "Send" });
        
        await fireEvent.change(userLogin , {target : {value: "Lucas"}})       
        await fireEvent.change(userPassword , {target : {value: "mlQdoido"}})       
        
        expect(userLogin).toHaveValue("Lucas");
        expect(userPassword).toHaveValue("mlQdoido");
        
        act(() => {
            buttonSubmit.click()
        })
        
        expect(await screen.findByText("Dados inválidos!")).toBeVisible();
    });
});