import {Header} from "../../../component/inc/Header"
import {Sidebar_obtn} from "../../../component/inc/Sidebar"
import {ObtnRegisterBody} from "./ObtnRegisterBody"
import {ObtnRegisterHead} from "./ObtnRegisterHead"
import {MainTitle} from "../../../component/MainTitle.jsx";

export const ObtnRegister = () => {


    return (

        <>
            <MainTitle title={"* 수주등록"}/>
            <ObtnRegisterHead/>
            <ObtnRegisterBody/>


        </>


    )
}