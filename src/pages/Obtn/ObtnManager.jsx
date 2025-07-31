import { Header } from "../../component/inc/Header"
import { Sidebar_obtn } from "../../component/inc/Sidebar"

export const ObtnManager = () => {



    return (
      <div className="h-screen flex flex-col">

            {<Header />}
     
            <div className="flex flex-1">
                {<Sidebar_obtn />}
                <main className="flex-1 p-6">

                    수주관리페이지입니다.

                </main>
            </div>
       
     </div>
    )
}