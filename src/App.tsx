import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
