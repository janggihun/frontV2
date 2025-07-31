import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { DashBoardManager } from './pages/DashBoard/DashBoardManager'
import { BomManager } from './pages/Bom/BomManager'
import { ObtnManager } from './pages/Obtn/ObtnManager'

import { AdminManager } from './pages/Admin/AdminManager'
import { PurchaseManager } from './pages/Purchase/PurchaseManager'
import { WorkManager } from './pages/Work/WorkManager'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUserData } from './store/UserSlice.Jsx'


function App() {
  const dispatch = useDispatch();
  //다른거 쓸예정

  // const User = useSelector((state) => {
  //   return state.User.value;
  // });


  useEffect(() => {
    const getId = async () => {

      //userId , 권한 확인
      const url = "/api/v1/user/Authorization";
      const pathname = window.location.pathname
      try {
        const res = await getAxios(url);

        if (res.status === Status.SUCCESS && res.data) {

          dispatch(initUserData(res.data))
          return;
        }

        if (!(pathname === "/")) {
          window.location.href = "/";
        }

      } catch (error) {
        if (!(pathname === "/")) {
          window.location.href = "/";
        }
      }
    };

    getId();


  }, []);




  return (
    <>
      <Routes>
        {/* 로그인화면 */}
        <Route path="/" element={<Login />} />

        {/* 대쉬보드 */}
        {/* 권한 올 허용 */}
        <Route path="/dashBoard/manager" element={<DashBoardManager />} />

        {/* 제원관리 */}
        <Route path="/bom/manager" element={<BomManager />} />
        {/* <Route path="/bom/register" element={<Bom />} /> */}

        {/* 수주 */}
        <Route path="/obtn/manager" element={<ObtnManager />} />

        {/* 작업지시 */}
        <Route path="/work/manager" element={<WorkManager />} />

        {/* 구매자재 */}
        <Route path="/purchase/manager" element={<PurchaseManager />} />

        {/* 관리자 */}
        <Route path="/admin/manager" element={<AdminManager />} />

        {/* 정의되지 않은 경로는 로그인 페이지로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </>
  )
}

export default App
