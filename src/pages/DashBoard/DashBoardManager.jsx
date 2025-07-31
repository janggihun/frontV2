import { useNavigate } from "react-router-dom"
import { Header } from "../../component/inc/Header"
import { Sidebar_dashBoard } from "../../component/inc/Sidebar"

export const DashBoardManager = () => {

    // 필수 통과 길이므로 리덕스값 취득
    const navigate = useNavigate();


    return (
        <div className="h-screen flex flex-col">

            {<Header />}
            <div className="flex flex-1">
                {<Sidebar_dashBoard />}
                <main className="flex-1 p-6">

                    대시보드 관리 페이지 입니다

                </main>
            </div>

        </div>
    )
}