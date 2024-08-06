import React from "react";
import "../styles/MyPage.css";
import { Link } from "react-router-dom";

const MyPage = () => {
  return (
    <div className="container">
      <p className="insurance-info">회원님의 보험정보</p>
      <main className="mypage-main">
        <Link to="/my-insurance">
          <a href="/">내가 가입한 보험 정보 보러가기🎶</a>
        </Link>
      </main>
    </div>
  );
};

export default MyPage;
