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
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar
        handleOpenAndCloseSidebar={handleOpenAndCloseSidebar}
        isOpenSidebar={isOpenSidebar}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpenSidebar ? "ml-64" : "ml-0"
        }`}
      >
        <Header handleOpenAndCloseSidebar={handleOpenAndCloseSidebar} />
        <div className="flex-1 bg-gray-100 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
