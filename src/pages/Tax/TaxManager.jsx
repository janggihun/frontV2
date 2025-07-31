import { Header } from "../../component/inc/Header"
import { Sidebar_tax } from "../../component/inc/Sidebar"

export const TaxManager  = ()=>{



  return (
        <div className="h-screen flex flex-col">

            {<Header />}
            <div className="flex flex-1">
                {<Sidebar_tax />}
                <main className="flex-1 p-6">

                    관리자 매니저입니다.

                </main>
            </div>

        </div>
    )





}