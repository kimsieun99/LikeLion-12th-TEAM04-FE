import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MyInsurancePage from "./components/MyInsurancePage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Router>
        {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/my-insurance" element={<MyInsurancePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
