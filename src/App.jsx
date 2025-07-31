import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { DashBoardManager } from './pages/DashBoard/DashBoardManager'
import { BomManager } from './pages/Bom/BomManager'
import { ObtnManager } from './pages/Obtn/ObtnManager'
import { AdminManager } from './pages/Admin/AdminManager'
import { PurchaseManager } from './pages/Purchase/PurchaseManager'
import { WorkManager } from './pages/Work/WorkManager'
import {BomRegister} from "./pages/Bom/BomRegister.jsx";
import { UserAuth } from './component/UserAuth.jsx'
import { TaxManager } from './pages/Tax/TaxManager.jsx'


function App() {
 
  return (
    <>
      <UserAuth/>
   
      <Routes>
        {/* 로그인화면 */}
        <Route path="/" element={<Login />} />

        {/* 대쉬보드 */}
        {/* 권한 올 허용 */}
        <Route path="/dashBoard/manager" element={<DashBoardManager />} />

        {/* 제원관리 */}
        <Route path="/bom/manager" element={<BomManager />} />
        <Route path="/bom/register" element={<BomRegister />} />
        {/* <Route path="/bom/register" element={<Bom />} /> */}

        {/* 수주 */}
        <Route path="/obtn/manager" element={<ObtnManager />} />

        {/* 작업지시 */}
        <Route path="/work/manager" element={<WorkManager />} />

        {/* 구매자재 */}
        <Route path="/purchase/manager" element={<PurchaseManager />} />
        {/*세금*/}
        <Route path="/tax/manager" element={<TaxManager />} />
        {/* 관리자 */}
        <Route path="/admin/manager" element={<AdminManager />} />

        {/* 정의되지 않은 경로는 로그인 페이지로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </>
  )
}

export default App
