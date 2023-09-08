import { Route, Routes } from "react-router-dom";
import Products from "../pages/Products";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" Component={Products} />
    </Routes>
  );
}

export default RoutesApp;