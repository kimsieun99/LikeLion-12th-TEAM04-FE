import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setInsuranceData,
  setLoading,
  setError,
  setToken,
} from "../state/insuranceSlice";

const MyInsurancePage = () => {
  const dispatch = useDispatch();
  const {
    insuranceData = [],
    loading,
    error,
    token,
  } = useSelector((state) => state.insurance);

  // 더미 토큰 설정
  const dummyToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiQXV0aG9yaXphdGlvbiI6IlJPTEVfVVNFUiIsImV4cCI6MTcyMjc4MjE1NH0.8sPNdAV-4XkvT6yEnbMtOa50igz1PKCfbIYr0ajANUE";

  useEffect(() => {
    const fetchInsuranceData = async () => {
      dispatch(setLoading(true));
      dispatch(setToken(dummyToken)); // 더미 토큰 저장

      try {
        const response = await axios.get(
          "https://tearofserver.store/api/v1/contract",
          {
            headers: {
              Authorization: `Bearer ${dummyToken}`, // 더미 토큰 사용
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.code === 200) {
          dispatch(setInsuranceData(response.data.data || [])); // 보험 목록 가져오기
        } else {
          dispatch(setError(response.data.message));
        }
      } catch (error) {
        if (error.response) {
          dispatch(setError(error.response.data.message));
        } else {
          dispatch(setError("데이터를 가져오는 데 오류가 발생했습니다."));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchInsuranceData(); // 컴포넌트가 마운트될 때 데이터 요청
  }, [dispatch]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>내 보험 페이지</h1>
      {insuranceData.length === 0 ? (
        <div>보험 정보가 없습니다.</div>
      ) : (
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
      )}
    </div>
  );
};

export default MyInsurancePage;
