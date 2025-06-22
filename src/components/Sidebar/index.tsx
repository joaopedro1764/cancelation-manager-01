import {
  LayoutDashboard,
  List,
  LogOut,
  Users
} from "lucide-react";
import logo from "../../assets/logo-n.png";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpenSidebar: boolean;
  handleOpenAndCloseSidebar: () => void;
}
export function Sidebar({
  isOpenSidebar,
  
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

  if (!isOpenSidebar) {
    return null;
  }
  return (
    <aside className="min-h-screen w-64 bg-gray-50 rounded-xl border-r border-r-gray-200 p-4 duration-300 transition-all ease-in-out">
      <nav className="h-full flex justify-center flex-col font-semibold relative">
        
        <img src={logo} className="mx-auto mt-14" />
        <ul className="mt-10 cursor-p flex flex-col gap-4 ">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                data-active={location.pathname === item.link}
                to={item.link}
                className="flex items-center gap-1.5 px-5 py-3 rounded-lg hover:bg-slate-300 data-[active=true]:bg-blue-500 data-[active=true]:text-white"
              >
                <span>{item.icon}</span>
               <span className="text-sm">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto mb-5">
          <div
            className="flex justify-center items-center gap-2"
          >
            <button
              title="Sair"
              className="flex items-center justify-center gap-2 font-bold cursor-pointer"
            >
               <span className="text-xl">Sair</span>
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
