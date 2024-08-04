// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Footer from "./components/Footer";
import MyPage from "./components/MyPage";
import SignupPage from "./components/SignupPage"; // SignupPage import
import ProtectedComponent from "./components/ProtectedComponent"; // ProtectedComponent import

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={
            <>
              <Section1 />
              <Section2 />
              <Section3 />
              <Section4 />
              <Footer />
            </>
          } />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/protected" element={<ProtectedComponent />} /> {/* ProtectedComponent 사용 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
