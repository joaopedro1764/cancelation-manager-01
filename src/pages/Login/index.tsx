import { useNavigate } from "react-router-dom";
import logo from "../../assets/fundo-login.png";
import logoN from "../../assets/logo-n.png";

export function Login() {
  const navigate = useNavigate();

  function goToDashboard() {
    navigate("/dashboard");
  }
  return (
    <div className="h-screen flex max-xl:justify-center items-center">
      <div className="hidden xl:block w-1/2 h-screen">
        <img className="h-full object-cover" src={logo} />
      </div>
      <div className="flex flex-col justify-center w-1/2 h-full px-40">
        <img src={logoN} className="mx-auto" />
        <div className="w-full flex flex-col gap-5 items-center mt-10">
          <h1 className="text-5xl font-bold text-[#343a40] max-xl:text-2xl">
            Bem vindo de volta!
          </h1>
          <span className="text-gray-400 font-medium">
            Faça login para gerenciar os cancelamentos
          </span>
        </div>
        <form className="flex flex-col justify-center gap-5 w-full mt-4 xl:px-10">
          <div className="flex flex-col gap-0.5">
            <label className="font-bold text-gray-400">
              Digite o seu e-mail
            </label>
            <input
              placeholder="E-mail"
              className="p-4 bg-gray-50 w-full border-gray-300 border-2 border-solid rounded-md placeholder:font-bold"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="font-bold text-gray-400">
              Digite a sua senha
            </label>
            <input
              type="password"
              placeholder="Senha"
              className="p-4 bg-gray-50 w-full border-gray-300 border-2 border-solid rounded-md  placeholder:font-bold"
            />
          </div>
          <button
            onClick={goToDashboard}
            type="submit"
            className="bg-blue-700 p-5 rounded-md text-white hover:bg-blue-500 font-medium cursor-pointer mt-5"
          >
            Entrar
          </button>
        </form>
        <footer className="mt-10 text-center text-yellow-500 font-bold">
          Não possui conta? Fale com seu Gestor
        </footer>
      </div>
    </div>
  );
}
