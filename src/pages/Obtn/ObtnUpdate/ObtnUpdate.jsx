import {MainTitle} from "../../../component/MainTitle.jsx";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useInput} from "../../../component/InputTag/useInput.jsx";
import {useState} from "react";

export const ObtnUpdate = () => {
    const navigate = useNavigate();

    const [obtnDtls, setObtnDtls] = useState();


    //*************** 수주
    //부가세
    const stx = useInput();
    //회사
    const compHdr = useInput();

    //*************** 수주상세
    //정렬순서 저장시 추가
    //sortIndex;

    const createObtnDtl=()=>{
        const obtnDtl = {
            itemHdr: "",   // 초기값
            obtnMony: "",
            obtnAmt: ""
        };
        setObtnDtls(prev => [...prev, obtnDtl]);
    }
    const save =async ()=>{


    }
    return (

        <>
            <MainTitle title={"* 수주수정"}/>
            <div className="p-1 w-[100%] h-[50px]  flex justify-end">
                <Button variant="contained" onClick={save}>저장하기</Button>
            </div>
            <div className="w-full  p-2 flex gap-2">
                <TextField label="부가세" variant="outlined" fullWidth size="small" value={stx.value}
                           onChange={stx.onChange}/>
                <TextField label="품목이름" variant="outlined" fullWidth size="small" value={itemNm.value}
                           onChange={itemNm.onChange}/>
                <TextField label="실행원가" variant="outlined" fullWidth size="small" value={itemMony.value}
                           onChange={itemMony.onChange}/>
            </div>
        </>


    )
}