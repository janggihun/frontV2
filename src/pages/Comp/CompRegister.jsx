import {MainTitle} from "../../component/MainTitle.jsx";
import Button from "@mui/material/Button";
import {useInput} from "../../component/InputTag/useInput.jsx";
import {TextField} from "@mui/material";
import {postAxios} from "../../api/restApi.js";
import {useNavigate} from "react-router-dom";
import {Status} from "../../enum/enum.js";


export const CompRegister = () => {
    const navigate = useNavigate();
    //INPUT태그
    const compNm = useInput();      //품목코드
    const compAdr = useInput();      //품목이름
    const compCd = useInput();    //실행원가

    const save = async () => {
        const saveMap = {
            compNm: compNm.value,
            compAdr: compAdr.value,
            compCd: compCd.value,

        }
        const url = "/api/comp/save"
        const res = await postAxios(url, saveMap);
        if(res.status === Status.SUCCESS) {
            navigate("/comp/manager")
        }
        console.log("res", res);
    }
    return (

        <>
            <MainTitle title={"* 거래처 등록"}/>
            <div className="p-1 w-[100%] h-[50px]  flex justify-end">
                <Button variant="contained" onClick={save}>저장하기</Button>
            </div>
            <div className="w-full  p-2 flex gap-2">
                <TextField label="회사이름" variant="outlined" fullWidth size="small" value={compNm.value}
                           onChange={compNm.onChange}/>
                <TextField label="회사주소" variant="outlined" fullWidth size="small" value={compAdr.value}
                           onChange={compAdr.onChange}/>
                <TextField label="사업자등록증" variant="outlined" fullWidth size="small" value={compCd.value}
                           onChange={compCd.onChange}/>
            </div>

        </>

    )
}