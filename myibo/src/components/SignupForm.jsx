// // src/components/SignupForm.jsx

// import React, { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import {
//   setUserName,
//   setIdentity,
//   setBirthDate,
//   setTelecom,
//   setPhoneNo,
//   setId,
//   setPassword,
//   setEmail,
//   setSmsAuthNo,
//   setTwoWayInfo,
//   setIsSmsSent,
// } from '../state/slices/signupSlice';
// import '../styles/SignupForm.css';

// const SignupForm = () => {
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.signup);
//   const [errors, setErrors] = useState({
//     userName: '',
//     identity: '',
//     birthDate: '',
//     phoneNo: '',
//     id: '',
//     email: '',
//     password: '',
//     smsAuthNo: '',
//   });

//   const validateForm = useCallback(() => {
//     let newErrors = {
//       userName: '',
//       identity: '',
//       birthDate: '',
//       phoneNo: '',
//       id: '',
//       email: '',
//       password: '',
//       smsAuthNo: '',
//     };
//     if (!formData.userName) {
//       newErrors.userName = '이름을 입력하세요';
//     }
//     if (formData.identity.length !== 7) {
//       newErrors.identity = '주민등록번호 뒷 7자리를 입력하세요';
//     }
//     if (formData.birthDate.length !== 6) {
//       newErrors.birthDate = '주민등록번호 앞 6자리를 입력하세요';
//     }
//     if (formData.phoneNo.length !== 11) {
//       newErrors.phoneNo = '전화번호 11자리를 입력하세요';
//     }
//     if (!formData.id) {
//       newErrors.id = '아이디를 입력하세요';
//     }
//     if (!formData.email) {
//       newErrors.email = '이메일을 입력하세요';
//     }
//     if (!formData.password || !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/.test(formData.password)) {
//       newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함한 6자 이상이어야 합니다';
//     }
//     if (formData.isSmsSent && formData.smsAuthNo.length !== 6) {
//       newErrors.smsAuthNo = '휴대폰 본인확인 인증번호 6자리를 입력하세요';
//     }
//     setErrors(newErrors);
//   }, [formData]);

//   useEffect(() => {
//     validateForm();
//   }, [formData, validateForm]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const sanitizedValue = value.replace(/\s+/g, ''); // 공백 제거
//     switch (name) {
//       case 'userName':
//         dispatch(setUserName(sanitizedValue));
//         break;
//       case 'identity':
//         if (sanitizedValue.length <= 7) {
//           dispatch(setIdentity(sanitizedValue));
//         }
//         break;
//       case 'birthDate':
//         if (sanitizedValue.length <= 6) {
//           dispatch(setBirthDate(sanitizedValue));
//         }
//         break;
//       case 'telecom':
//         dispatch(setTelecom(sanitizedValue));
//         break;
//       case 'phoneNo':
//         if (sanitizedValue.length <= 11) {
//           dispatch(setPhoneNo(sanitizedValue));
//         }
//         break;
//       case 'id':
//         dispatch(setId(sanitizedValue));
//         break;
//       case 'password':
//         dispatch(setPassword(sanitizedValue));
//         break;
//       case 'email':
//         dispatch(setEmail(sanitizedValue));
//         break;
//       case 'smsAuthNo':
//         if (sanitizedValue.length <= 6) {
//           dispatch(setSmsAuthNo(sanitizedValue));
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   const requestSmsAuth = async () => {
//     try {
//       await axios.post('http://localhost:8080/auth/request-sms', {
//         phoneNo: formData.phoneNo,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       dispatch(setIsSmsSent(true));
//     } catch (error) {
//       console.error('SMS 요청 에러:', error.response?.data || error.message);
//     }
//   };

//   const isFormValid = () => {
//     return (
//       formData.userName &&
//       formData.identity.length === 7 &&
//       formData.birthDate.length === 6 &&
//       formData.phoneNo.length === 11 &&
//       formData.id &&
//       formData.email &&
//       /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/.test(formData.password) &&
//       (!formData.isSmsSent || formData.smsAuthNo.length === 6)
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isFormValid()) {
//       try {
//         const firstResponse = await axios.post('http://localhost:8080/auth/sign-up', {
//           userName: formData.userName,
//           identity: formData.identity,
//           birthDate: formData.birthDate,
//           telecom: formData.telecom,
//           phoneNo: formData.phoneNo,
//           id: formData.id,
//           password: formData.password,
//           email: formData.email,
//         }, {
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           params: {
//             thirdPartyToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlX3R5cGUiOiIxIiwic2NvcGUiOlsicmVhZCJdLCJzZXJ2aWNlX25vIjoiMDAwMDA0MzM4MDAyIiwiZXhwIjoxNzIyNTgyNjYzLCJhdXRob3JpdGllcyI6WyJJTlNVUkFOQ0UiLCJQVUJMSUMiLCJCQU5LIiwiRVRDIiwiU1RPQ0siLCJDQVJEIl0sImp0aSI6ImVjYTU5OTRkLWNmOTktNDRjOS1iYmEyLTIxZTA2YmZhNTY0NiIsImNsaWVudF9pZCI6ImRiZDJmMTRmLWE3NGUtNDYzZS04ZTFmLTkzYTIxMDFlNTE1NyJ9.dy6eySZwdstlxCOOkypt1430Qo1-rlxLBUabxajurG3pkWSAe4i0Aikxx9c0UhlNPpx__fnHn49169p0jWTRY9Dv_KW369nSNhlieeqha8goYc4ruWJhazJaeyVDX45WidSY3_f-xSiJN_Jg2FoQ69SU15_T3L5mvNGVYeXTigZz717rsHdPNilSSQPoP-XDQUoCAlUhVgLBzwKHl6X71Xv05Ob43lWqxhbEpGjCF808TYlzeHf8vRXYJ_mYK-8C6yB-S72oKzo0OLnbJCZQaqIlCxABPbYNfkljTCMMYExsdudWA2Ow1ssd74YYhAKXfxQnEO2NpBkyTQptGkXcYw'
//           }
//         });

//         console.log('1차 인증 응답:', firstResponse.data);

//         // 1차 인증 후 필요한 정보 설정
//         dispatch(setTwoWayInfo(firstResponse.data.data));

//         const secondResponse = await axios.post('http://localhost:8080/auth/sign-up/two-way', {
//           organization: '0001',
//           id: formData.id,
//           userName: formData.userName,
//           identity: formData.identity,
//           birthDate: formData.birthDate,
//           telecom: formData.telecom,
//           phoneNo: formData.phoneNo,
//           password: formData.password,
//           email: formData.email,
//           smsAuthNo: formData.smsAuthNo,
//           is2Way: 'true',
//           twoWayInfo: formData.twoWayInfo,
//         }, {
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           params: {
//             thirdPartyToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlX3R5cGUiOiIxIiwic2NvcGUiOlsicmVhZCJdLCJzZXJ2aWNlX25vIjoiMDAwMDA0MzM4MDAyIiwiZXhwIjoxNzIyNTgyNjYzLCJhdXRob3JpdGllcyI6WyJJTlNVUkFOQ0UiLCJQVUJMSUMiLCJCQU5LIiwiRVRDIiwiU1RPQ0siLCJDQVJEIl0sImp0aSI6ImVjYTU5OTRkLWNmOTktNDRjOS1iYmEyLTIxZTA2YmZhNTY0NiIsImNsaWVudF9pZCI6ImRiZDJmMTRmLWE3NGUtNDYzZS04ZTFmLTkzYTIxMDFlNTE1NyJ9.dy6eySZwdstlxCOOkypt1430Qo1-rlxLBUabxajurG3pkWSAe4i0Aikxx9c0UhlNPpx__fnHn49169p0jWTRY9Dv_KW369nSNhlieeqha8goYc4ruWJhazJaeyVDX45WidSY3_f-xSiJN_Jg2FoQ69SU15_T3L5mvNGVYeXTigZz717rsHdPNilSSQPoP-XDQUoCAlUhVgLBzwKHl6X71Xv05Ob43lWqxhbEpGjCF808TYlzeHf8vRXYJ_mYK-8C6yB-S72oKzo0OLnbJCZQaqIlCxABPbYNfkljTCMMYExsdudWA2Ow1ssd74YYhAKXfxQnEO2NpBkyTQptGkXcYw'
//           }
//         });

//         console.log('2차 인증 응답:', secondResponse.data);
//       } catch (error) {
//         console.error('에러:', error.response?.data || error.message);
//       }
//     } else {
//       validateForm();
//     }
//   };

//   return (
//     <div className="signup-form-container">
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>
//             이름
//             <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
//           </label>
//           {errors.userName && <p className="error-message">{errors.userName}</p>}
//         </div>
//         <div className="form-group">
//           <label>
//             주민등록번호 앞 6자리
//             <input
//               type="text"
//               name="birthDate"
//               value={formData.birthDate}
//               onChange={handleChange}
//               placeholder="주민등록번호 앞 6자리 입력하세요"
//               required
//             />
//           </label>
//           {errors.birthDate && <p className="error-message">{errors.birthDate}</p>}
//         </div>
//         <div className="form-group">
//           <label>
//             주민등록번호 뒷 7자리
//             <input
//               type="text"
//               name="identity"
//               value={formData.identity}
//               onChange={handleChange}
//               placeholder="주민등록번호 뒷 7자리 입력하세요"
//               required
//             />
//           </label>
//           {errors.identity && <p className="error-message">{errors.identity}</p>}
//         </div>
//         <div className="form-group">
//           <label>
//             통신사
//             <select name="telecom" value={formData.telecom} onChange={handleChange} required>
//               <option value="0">SKT</option>
//               <option value="1">KT</option>
//               <option value="2">LG U+</option>
//               <option value="3">알뜰폰(SKT)</option>
//               <option value="4">알뜰폰(KT)</option>
//               <option value="5">알뜰폰(LG U+)</option>
//             </select>
//           </label>
//         </div>
//         <div className="form-group">
//           <label>
//             전화번호
//             <input
//               type="text"
//               name="phoneNo"
//               value={formData.phoneNo}
//               onChange={handleChange}
//               placeholder="전화번호 11자리 입력하세요"
//               required
//             />
//           </label>
//           {errors.phoneNo && <p className="error-message">{errors.phoneNo}</p>}
//         </div>
//         <div className="form-group">
//           <label>
//             아이디
//             <input
//               type="text"
//               name="id"
//               value={formData.id}
//               onChange={handleChange}
//               placeholder="아이디를 입력하세요"
//               required
//             />
//           </label>
//           {errors.id && <p className="error-message">{errors.id}</p>}
//         </div>
//         <div className="form-group">
//           <label>
//             비밀번호
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="비밀번호를 입력하세요"
//               required
//             />
//           </label>
//           {errors.password && <p className="error-message">{errors.password}</p>}
//         </div>
//         <div className="form-group">
//           <label>
//             이메일
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="이메일을 입력하세요"
//               required
//             />
//           </label>
//           {errors.email && <p className="error-message">{errors.email}</p>}
//         </div>
//         <div className="form-group">
//           <label>
//             휴대폰 인증번호
//             <input
//               type="text"
//               name="smsAuthNo"
//               value={formData.smsAuthNo}
//               onChange={handleChange}
//               placeholder="휴대폰 인증번호 6자리 입력하세요"
//               required
//               disabled={!formData.isSmsSent}
//             />
//           </label>
//           {errors.smsAuthNo && <p className="error-message">{errors.smsAuthNo}</p>}
//           <button type="button" onClick={requestSmsAuth} disabled={formData.isSmsSent || formData.phoneNo.length !== 11}>
//             인증번호 요청
//           </button>
//         </div>
//         <button type="submit" className={`submit-button ${isFormValid() ? 'active' : 'inactive'}`} disabled={!isFormValid()}>
//           회원가입하기
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;
