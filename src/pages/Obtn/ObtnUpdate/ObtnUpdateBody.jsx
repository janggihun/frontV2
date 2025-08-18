import {InputText} from "../../../component/InputTag/InputText.jsx";
import {InputSelectBox} from "../../../component/InputTag/InputSelectBox.jsx";
import {useInput} from "../../../component/InputTag/useInput.jsx";
import {useEffect, useState} from "react";
import {getAxios, getCompRead, patchAxios, postAxios} from "../../../api/restApi.js";
import {Status} from "../../../enum/enum.js";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export const ObtnUpdateBody =()=>{
    const {id} = useParams();
    const User = useSelector((state)=>{
        return state.User.value
    })

    const navigate = useNavigate();
    const [compList, setCompList] = useState()
    const SeachBoxHeight = 50;

    //INPUT태그
    const obtnNm = useInput();      //수주번호
    const plceNm = useInput();      //장소
    const obtnMk = useInput();      //비고
    const mony = useInput();        //수주금액
    const comp = useInput();        //회사

    const handleSubmit = async () => {

        const saveMap = {
            id :parseInt(id),
            obtnNm: obtnNm.value,
            plceNm: plceNm.value,
            obtnMk: obtnMk.value, //비고
            mony: mony.value,
            compId : parseInt(comp.value),
            userId  : User
        };

        const url = "/api/v1/obtn/update";
        const res = await patchAxios(url, saveMap);

        if (res.status === Status.SUCCESS) {
            return navigate("/obtn/manager");
        }

    };
    useEffect(() => {

        const getData = async () => {

            const res_comp = await getCompRead();
            //전처리
            res_comp.forEach((el) => {
                el.value = el.id;
                el.name = el.compNm;
            })
            setCompList(res_comp)
                
            //obtn획득
            const url_obtn = "/api/v1/obtn/obtn-info";
            const res_obtn = await getAxios(url_obtn,{id});

            const data =  res_obtn.data
            // const obtnNmMap = {target : {value : ""}}
            // obtnNmMap.target.value = data.obtnNm
            console.log(data)

            const compMap = data.company;
            console.log(compMap)
            obtnNm.changeValue(data.obtnNm);
            mony.changeValue(data.mony)
            plceNm.changeValue(data.compAdr);
            comp.changeValue(data.compId)

        }
        getData()

    }, [])
    return (
        <>
            <div className="w-full h-[5%] flex justify-end items-center bg-red-100">
                <div>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        수정하기
                    </button>
                </div>

            </div>


            <div className="p-4">
                <div className="grid grid-cols-4 divide-x divide-y ">
                    <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                        <InputText label="수주번호" {...obtnNm} disabled={true}/>
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
                        <InputSelectBox label="회사명" {...comp} list={compList}/>
                    </div>
                    <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                        <InputText label="주소" {...plceNm} />
                    </div>

                    <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                        <InputText label="비고" {...obtnMk}  />
                    </div>
                    <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
                        <InputText label="수주금액" {...mony} />
                    </div>

                </div>


            </div>
        </>
    );

}