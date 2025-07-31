import {Header} from "./inc/Header.jsx";
import {Outlet, useLocation} from "react-router-dom";
import {headerList} from "./Common.jsx";

export const Layout = () => {
    const location = useLocation();

    return (

        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
                {
                    headerList.find((el)=>{
                    if(location.pathname.startsWith(el.url)){
                        return el;
                    }
                }).comp
                }
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>

        </div>

    );
};