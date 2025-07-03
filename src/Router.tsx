import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { DefaultLayout } from "./pages/DefaultLayout";
import { Cancelamentos } from "./pages/Cancelamentos";
import { Retencoes } from "./pages/Retenções";

// eslint-disable-next-line react-refresh/only-export-components
export const routes = [
  { path: "/cancelamentos", element: <Cancelamentos /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/retencoes", element: <Retencoes /> },
];

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<DefaultLayout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
