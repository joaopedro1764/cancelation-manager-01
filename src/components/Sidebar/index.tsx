import { LayoutDashboard, LogOut, UserCheck, Users } from "lucide-react";
import logo from "../../assets/logo-n.png";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpenSidebar: boolean;
  handleOpenAndCloseSidebar: () => void;
}

export function Sidebar({ isOpenSidebar }: SidebarProps) {
  const items = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Cancelamentos",
      link: "/cancelamentos",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Retenções",
      link: "/retencoes",
      icon: <UserCheck className="w-5 h-5" />,
    },
  ];

  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpenSidebar && (
        <motion.aside
          key="sidebar"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 min-h-screen w-64 bg-gray-50 rounded-r-xl border-r border-gray-200 p-4 z-50 shadow-lg"
        >
          <nav className="h-full flex justify-center flex-col font-semibold">
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
           
              <div className="w-full flex justify-center items-center absolute bottom-15">
                <button
                  title="Sair"
                  className="flex items-center justify-center gap-2 font-bold cursor-pointer"
                >
                  <span>Sair</span>
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
          
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
