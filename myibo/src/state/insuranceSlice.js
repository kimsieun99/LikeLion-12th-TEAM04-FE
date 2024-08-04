// insuranceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const insuranceSlice = createSlice({
  name: "insurance",
  initialState: {
    insuranceData: [],
    loading: false,
    error: null,
    token: null,
  },
  reducers: {
    setInsuranceData(state, action) {
      state.insuranceData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

// 액션 생성자 내보내기
export const { setInsuranceData, setLoading, setError, setToken } =
  insuranceSlice.actions;

// 리듀서 내보내기
export default insuranceSlice.reducer;
