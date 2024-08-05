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
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";

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
            </>
          } />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
