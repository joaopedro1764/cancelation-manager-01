import { PanelRight } from "lucide-react";

interface HeaderProps {
  title: string;

  handleOpenAndCloseSidebar: () => void;
}

export function Header({ title, handleOpenAndCloseSidebar }: HeaderProps) {
  return (
    <header className="flex justify-between items-center border-b border-gray-200 bg-white py-3 px-5 shadow-sm rounded-l-lg">
      <span className="ml-6 flex text-2xl font-bold items-center gap-4 ">
        <PanelRight
          onClick={handleOpenAndCloseSidebar}
          className="w-8 h-8 p-2 rounded hover:bg-gray-100"
        />
        <p className="w-px h-6 bg-black opacity-50 " />
        {title}
      </span>
      <div className="flex gap-3 items-center">
        <img
          className="w-10 h-10 rounded-full ring-2 ring-blue-500"
          src="https://avatars.githubusercontent.com/u/112516752?v=4"
          alt="Avatar"
        />
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-gray-800">João Pedro</span>
          <span className="text-gray-500">Desenvolvedor</span>
        </div>
      </div>
    </header>
  );
}
