import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Details from "./components/Details";
import Search from "./components/Search";
import { CatProvider } from "./contexts/CatContext";
import { PageProvider } from "./contexts/PageContext";

const App = () => {
  return (
    <PageProvider>
      <CatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:catId" element={<Details />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </CatProvider>
    </PageProvider>
  );
};

export default App;
