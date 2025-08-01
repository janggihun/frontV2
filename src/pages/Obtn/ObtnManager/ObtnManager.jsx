import { Header } from "../../../component/inc/Header"
import { Sidebar_obtn } from "../../../component/inc/Sidebar"
import { ObtnManagerHead } from "./ObtnManagerHead.jsx";
import { MainTitle } from "../../../component/MainTitle.jsx";
import { ObtnList } from "./ObtnList.jsx";

export const ObtnManager = () => {


    return (

        <>
            <MainTitle title={"* 수주관리"} />
            <ObtnList />
            {/* <ObtnManagerHead /> */}
        </>

    )
}