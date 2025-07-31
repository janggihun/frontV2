import { Header } from "../../component/inc/Header"
import { Sidebar_bom } from "../../component/inc/Sidebar"
import {useNavigate} from "react-router-dom";

export const BomRegister = ()=>{
    const navigate = useNavigate();




     return (
          <div className="h-screen flex flex-col">
  
              {<Header />}
              <div className="flex flex-1">
                  {<Sidebar_bom/>}
                  <main className="flex-1 p-6">
  
                     품목 저장페이지
  
                  </main>
              </div>
  
          </div>
      )
}