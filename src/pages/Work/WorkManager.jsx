import { Header } from "../../component/inc/Header"
import { Sidebar_work } from "../../component/inc/Sidebar"

export const WorkManager = ()=>{


    return (
             <div className="h-screen flex flex-col">
     
                 {<Header />}
                 <div className="flex flex-1">
                     {<Sidebar_work />}
                     <main className="flex-1 p-6">
     
                        작업지시 매니저입니다.
     
                     </main>
                 </div>
     
             </div>
         )
}