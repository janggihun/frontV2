import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from './pages/Login/Login.jsx'
import {DashBoardManager} from './pages/DashBoard/DashBoardManager'
import {BomManager} from './pages/Bom/BomManager'
import {ObtnManager} from './pages/Obtn/ObtnManager/ObtnManager.jsx'
import {AdminManager} from './pages/Admin/AdminManager'
import {PurchaseManager} from './pages/Purchase/PurchaseManager'
import {WorkManager} from './pages/Work/WorkManager'
import {BomRegister} from "./pages/Bom/BomRegister.jsx";
import {UserAuth} from './component/UserAuth.jsx'
import {TaxManager} from './pages/Tax/TaxManager.jsx'
import {ObtnRegister} from './pages/Obtn/ObtnRegister/ObtnRegister.jsx'
import {Layout} from "./component/Layout.jsx";
import {ObtnRead} from "./pages/Obtn/ObtnRead/ObtnRead.jsx";
import {LoadingComponent} from "./component/LoadingComponent.jsx";
import {getDispatch} from "./api/restApi.js";
import {useDispatch} from "react-redux";
import {ObtnUpdate} from "./pages/Obtn/ObtnUpdate/ObtnUpdate.jsx";
import {CompManager} from "./pages/Comp/CompManager.jsx";
import {CompRegister} from "./pages/Comp/CompRegister.jsx";


function App() {
    const dispatch = useDispatch();
    getDispatch(dispatch)
    return (
        <>

            <Routes>
                {/* 로그인화면 */}
                <Route path="/" element={<Login/>}/>

                {/* 정의되지 않은 경로는 로그인 페이지로 리다이렉트 */}
                <Route path="*" element={<Navigate to="/" replace/>}/>

                {/*유저체크*/}
                <Route element={<UserAuth/>}>
                    <Route element={<Layout/>}>
                        {/* 대쉬보드 */}
                        <Route path="/dashBoard/manager" element={<DashBoardManager/>}/>

                        {/* 거래처관리 */}
                        <Route path="/comp/manager" element={<CompManager/>}/>
                        <Route path="/comp/register" element={<CompRegister/>}/>

                        {/* 제원관리 */}
                        <Route path="/bom/manager" element={<BomManager/>}/>
                        <Route path="/bom/register" element={<BomRegister/>}/>
                        {/* <Route path="/bom/register" element={<Bom />} /> */}

                        {/* 수주 */}
                        <Route path="/obtn/manager" element={<ObtnManager/>}/>
                        <Route path="/obtn/register" element={<ObtnRegister/>}/>
                        <Route path="/obtn/update/:id" element={<ObtnUpdate/>}/>
                        <Route path="/obtn/read" element={<ObtnRead/>}/>
                        {/* 작업지시 */}
                        <Route path="/work/manager" element={<WorkManager/>}/>

                        {/* 구매자재 */}
                        <Route path="/purchase/manager" element={<PurchaseManager/>}/>
                        {/*세금*/}
                        <Route path="/tax/manager" element={<TaxManager/>}/>
                        {/* 관리자 */}
                        <Route path="/admin/manager" element={<AdminManager/>}/>
                    </Route>
                </Route>

            </Routes>
            {/* 로딩창 */}
            <LoadingComponent/>
        </>
    )
}

export default App
