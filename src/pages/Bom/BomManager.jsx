import { Header } from "../../component/inc/Header"
import { Sidebar_bom } from "../../component/inc/Sidebar"

export const BomManager = ()=>{





     return (
          <div className="h-screen flex flex-col">
  
              {<Header />}
              <div className="flex flex-1">
                  {<Sidebar_bom />}
                  <main className="flex-1 p-6">
  
                      제원관리 매니저입니다.
  
                  </main>
              </div>
  
          </div>
      )
}