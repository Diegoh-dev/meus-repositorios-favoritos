import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Repositorio from "./pages/Repositorio";

export default function FnRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="repositorio/*" Component={Repositorio} />
        {/* <Route path="*" element={<p>Path not resolved</p>} /> */}
      </Routes>
    </BrowserRouter>
  );
}
