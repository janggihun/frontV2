import {InputText} from "../../../component/InputTag/InputText.jsx";
import {InputSelectBox} from "../../../component/InputTag/InputSelectBox.jsx";
import {useInput} from "../../../component/InputTag/useInput.jsx";
import {useEffect, useMemo, useState} from "react";
import {getAxios, getCompRead, patchAxios} from "../../../api/restApi.js";
import {Status} from "../../../enum/enum.js";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Autocomplete, TextField} from "@mui/material";
import Button from "@mui/material/Button";

export const ObtnUpdateBody = () => {
    const {id} = useParams();
    const User = useSelector((state) => {
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
            id: parseInt(id),
            obtnNm: obtnNm.value,
            plceNm: plceNm.value,
            obtnMk: obtnMk.value, //비고
            mony: mony.value,
            compId: comp.value,
            userId: User
        };

        const url = "/api/v1/obtn/update";
        const res = await patchAxios(url, saveMap);

        if (res.status === Status.SUCCESS) {
            return navigate("/obtn/manager");
        }

    };
    useEffect(() => {

        const getData = async () => {

            //obtn획득
            const url_obtn = "/api/v1/obtn/obtn-info";
            const res_obtn = await getAxios(url_obtn, {id});

            const data = res_obtn.data

            obtnNm.changeValue(data.obtnNm);
            mony.changeValue(data.mony)
            plceNm.changeValue(data.compAdr);
            comp.changeValue(data.compId)

            const res_comp = await getCompRead();
            //전처리
            res_comp.forEach((el) => {
                el.label = el.compNm;
            })
            setCompList(res_comp)
        }
        getData()

    }, [])
    const selectedComp = useMemo(() => {
        if (!compList?.length) return null;
        return compList.find(o => Number(o.id) === Number(comp.value)) ?? null;
    }, [compList, comp.value]);
    console.log(selectedComp)
    return (
        <>
            <div className="w-full h-[5%] flex justify-end items-center bg-red-100">
                <div>
                    <Button variant="contained" onClick={handleSubmit}>수정하기 </Button>
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
                    <Autocomplete
                        disablePortal
                        options={compList}
                        sx={{width: 300}}
                        getOptionLabel={(opt) => opt?.compNm ?? ""}
                        isOptionEqualToValue={(opt, val) => Number(opt.compId) === Number(val.compId)}
                        value={selectedComp}  // ✅ defaultValue 대신 항상 value 사용
                        renderInput={(params) => <TextField {...params} label="회사명"/>}
                        onChange={(event, newValue) => {
                            comp.changeValue(newValue.id)
                        }}
                    />

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