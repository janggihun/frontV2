import { useEffect, useState } from "react";
import { getCompRead, postAxios } from "../../../api/restApi.js";
import { Status } from "../../../enum/enum.js";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../../component/InputTag/inputText.jsx";
import { useInput } from "../../../component/InputTag/useInput.jsx";
import {InputSelectBox} from "../../../component/InputTag/InputSelectBox.jsx";

export const ObtnRegisterHead = (props) => {
    const navigate = useNavigate();
    const SeachBoxHeight = 50;
    const [compList, setCompList] = useState()
    const fields = [
        { key: "obtnNm", label: "수주번호" },
        { key: "compCd", label: "거래처" },
        { key: "plceNm", label: "현장명" },
        { key: "obtnMk", label: "비고" },
        { key: "mony", label: "수주금액" },

    ];

    //INPUT태그
    const obtnNm = useInput();      //수주번호
    const plceNm = useInput();      //장소
    const obtnMk = useInput();      //비고
    const mony = useInput();        //수주금액
    const comp = useInput();        //회사

    const handleSubmit = async () => {

        const saveMap = {
            obtnNm: obtnNm.value,
            plceNm: plceNm.value,
            obtnMk: obtnMk.value, //비고
            mony: mony.value,
            compId: comp.value
        };
        console.log(saveMap)
        const url = "/api/v1/obtn/save";
        const res = await postAxios(url, saveMap);

        if (res.status === Status.SUCCESS) {
            alert(res.data);

            return navigate("/obtn/manager");
        }
    };

    useEffect(() => {

        const getData = async () => {
            const res_comp = await getCompRead();
            //전처리
            res_comp.forEach((el)=>{
                el.value = el.id;
                el.name = el.compNm;
            })
            setCompList(res_comp)
        }
        getData()

    }, [])
    return (
        <div className="p-4">
            <div className="grid grid-cols-4 divide-x divide-y ">
                <div className={`flex items-center h-[${SeachBoxHeight}px]`} >
                    <InputText label="수주번호" {...obtnNm} disabled={true} />
                </div>
                <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                    {/* <InputText label="수주금액" {...mony} /> */}
                </div>
                <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                    {/* <InputText label="수주금액" {...mony} /> */}
                </div>
                <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                    {/* <InputText label="수주금액" {...mony} /> */}
                </div>
                <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                    <InputText label="현장명" {...plceNm} />
                </div>
                <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                    <InputSelectBox label="회사명" {...comp} list={compList} />
                </div>
                <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                    <InputText label="비고" {...obtnMk}  />
                </div>
                <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                    <InputText label="수주금액" {...mony} />
                </div>

            </div>

            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                저장하기
            </button>
        </div >
    );
};
