import { ObtnRegisterBody } from "./ObtnRegisterBody"
import { ObtnRegisterHead } from "./ObtnRegisterHead"
import { MainTitle } from "../../../component/MainTitle.jsx";
import { SubTitle } from "../../../component/Subtitle.jsx";
import { createObtnRegisterMap } from "../../../common/DataMap.js";
import { useDispatch } from "react-redux";
import { initData } from "../../../store/DataSlice.Jsx";
import { useEffect } from "react";

export const ObtnRegister = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // 해당 주소에서 사용하는 map을 만들어넣어준다.
        const map = createObtnRegisterMap()
        dispatch(initData(map))
    }, [])


    return (

        <>
            <MainTitle title={"* 수주등록"} />
            <SubTitle title={"* 업체정보"} />
            <ObtnRegisterHead />
            <ObtnRegisterBody />


        </>


    )
}