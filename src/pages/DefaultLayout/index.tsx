import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { useState } from "react";
import { Header } from "@/components/Header";

export function DefaultLayout() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  function handleOpenAndCloseSidebar() {
    setIsOpenSidebar(!isOpenSidebar);
  }

  return (
    <div className="flex h-screen bg-cover object-contain overflow-hidden">
      <Sidebar
        handleOpenAndCloseSidebar={handleOpenAndCloseSidebar}
        isOpenSidebar={isOpenSidebar}
      />

      <div className="flex-1 transition-all duration-200 flex-col bg-gray-100">
        <Header
          handleOpenAndCloseSidebar={handleOpenAndCloseSidebar}
          title="Dashboard"
        />
        <Outlet />
      </div>
    </div>
  );
}
