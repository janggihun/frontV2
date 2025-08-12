import { Header } from "../../../component/inc/Header"
import { Sidebar_obtn } from "../../../component/inc/Sidebar"
import { ObtnManagerHead } from "./ObtnManagerHead.jsx";
import { MainTitle } from "../../../component/MainTitle.jsx";
import { ObtnList } from "./ObtnList.jsx";
import { MyCalendar } from "../../../component/MyCalendar.jsx";
import {useState} from "react";

export const ObtnManager = () => {


    return (

        <>
            <MainTitle title={"* 수주관리"} />
            <div className="flex h-[350px] w-full">
                <ObtnList />
            </div>

        </>

    )
}