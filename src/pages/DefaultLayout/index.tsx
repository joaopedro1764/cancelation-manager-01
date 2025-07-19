import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { useState } from "react";

export function DefaultLayout() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);


  function handleOpenAndCloseSidebar() {
    setIsOpenSidebar((prev) => !prev);
  }

  function handleCollapseSidebar() {
    setIsCollapsed((prev) => !prev);
  }

  // Detecta se é mobile
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;

  // Calcula a margem do main baseada no estado da sidebar
  const getMainMargin = () => {
    if (!isOpenSidebar) return "ml-0";
    if (isMobile) return "ml-0"; // No mobile, não há margem quando sidebar está aberta (overlay)
    return isCollapsed ? "ml-20" : "ml-72";
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-100">
      {/* Sidebar sempre renderizada, mas controlada internamente */}
      <Sidebar 
        isOpenSidebar={isOpenSidebar}
        handleOpenAndCloseSidebar={handleOpenAndCloseSidebar}
        isCollapsed={isCollapsed}
        handleCollapseSidebar={handleCollapseSidebar}
      />

      <main 
        className={`w-full flex-col flex-1 overflow-auto bg-blue-50 scroll-smooth h-full p-10 transition-all duration-300 ease-out ${getMainMargin()}`}
      >
        <Outlet />
      </main>
    </div>
  );
}