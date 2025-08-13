import { ObtnRegisterBody } from "./ObtnRegisterBody"
import { ObtnRegisterHead } from "./ObtnRegisterHead"
import { MainTitle } from "../../../component/MainTitle.jsx";
import { SubTitle } from "../../../component/Subtitle.jsx";
import { createObtnRegisterMap } from "../../../common/DataMap.js";
import { useDispatch } from "react-redux";
import { initData } from "../../../store/DataSlice.Jsx";
import { useEffect } from "react";

export const ObtnRegister = () => {

    return (

        <>
            <MainTitle title={"* 수주등록"} />
            <ObtnRegisterHead />
        </>


    )
}