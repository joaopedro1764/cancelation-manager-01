import {
  LayoutDashboard,
  List,
  LogOut,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "../../assets/logo-n.png";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpenSidebar: boolean;
  handleOpenAndCloseSidebar: () => void;
}
export function Sidebar({
  isOpenSidebar,
  handleOpenAndCloseSidebar,
}: SidebarProps) {
  const items = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Clientes",
      link: "/clientes",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Solicitações",
      link: "/solicitacoes",
      icon: <List className="w-5 h-5" />,
    },
  ];

  const location = useLocation();

  return (
    <aside
      className={`${
        isOpenSidebar ? "w-72" : "w-20"
      } min-h-screen bg-gray-50 rounded-xl border-r border-r-gray-200 p-4 duration-300 transition-all ease-in-out`}
    >
      <nav className="h-full flex justify-center flex-col font-semibold relative">
        <button
          onClick={handleOpenAndCloseSidebar}
          className="bg-slate-300 p-2 rounded-full absolute top-0 -right-8 cursor-pointer shadow-xl"
          aria-label="Toggle Sidebar"
        >
          {isOpenSidebar ? (
            <ChevronLeft className="w-6 h-6" />
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </button>
        <img src={logo} className="mx-auto mt-14" />
        <ul className="mt-10 cursor-p flex flex-col gap-4 ">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                data-active={location.pathname === item.link}
                to={item.link}
                className={`flex items-center gap-1.5 px-5 py-3 rounded-lg hover:bg-slate-300 data-[active=true]:bg-blue-500 data-[active=true]:text-white ${
                  !isOpenSidebar && "justify-center"
                }`}
              >
                <span>{item.icon}</span>
                {isOpenSidebar && <span className="text-sm">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto mb-5">
          <div
            className={`flex  items-center gap-2 ${
              !isOpenSidebar ? "justify-between" : "justify-center"
            }`}
          >
            <button
              title="Sair"
              className="flex items-center gap-2 font-bold cursor-pointer"
            >
             {isOpenSidebar && <span className="text-xl">Sair</span>} <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
