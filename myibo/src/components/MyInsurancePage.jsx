// MyInsurancePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyInsurancePage = () => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const response = await axios.get("http://baseurl/api/v1/contract"); // API URL 수정
        if (response.data.code === 200) {
          setInsuranceData(response.data.data.MyInsuranceList); // API 응답에서 보험 목록 가져오기
        } else {
          setError(response.data.message); // 오류 메시지 표시
        }
      } catch (error) {
        setError("데이터를 가져오는 데 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsuranceData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>내 보험 페이지</h1>
      <ul>
        {insuranceData.map((insurance, index) => (
          <li key={index}>
            <strong>보험사 이름:</strong> {insurance.resCompanyNm} <br />
            <strong>보험사 코드:</strong> {insurance.resCompanyCode} <br />
            <strong>보험 상품명:</strong> {insurance.insuranceNm} <br />
            <strong>보험사 링크:</strong>{" "}
            <a
              href={insurance.resHomePage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {insurance.resHomePage}
            </a>{" "}
            <br />
            <strong>치과 보험 여부:</strong>{" "}
            {insurance.isDentalInsurance ? "예" : "아니요"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyInsurancePage;
