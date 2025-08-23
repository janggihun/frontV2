import {MainTitle} from "../../component/MainTitle.jsx";
import Button from "@mui/material/Button";
import {useInput} from "../../component/InputTag/useInput.jsx";
import {TextField} from "@mui/material";
import {postAxios} from "../../api/restApi.js";
import {useNavigate} from "react-router-dom";
import {Status} from "../../enum/enum.js";


export const BomRegister = () => {
    const navigate = useNavigate();
    //INPUT태그
    const itemCd = useInput();      //품목코드
    const itemNm = useInput();      //품목이름
    const itemMony = useInput();    //실행원가

    const save = async () => {
        const saveMap = {
            itemCd: itemCd.value,
            itemNm: itemNm.value,
            itemMony: itemMony.value,

        }
        const url = "/api/itemHdr/save"
        const res = await postAxios(url, saveMap);
        if(res.status === Status.SUCCESS) {
            navigate("/bom/manager")
        }
        console.log("res", res);
    }
    return (

        <>
            <MainTitle title={"* 품목 등록"}/>
            <div className="p-1 w-[100%] h-[50px]  flex justify-end">
                <Button variant="contained" onClick={save}>저장하기</Button>
            </div>
            <div className="w-full  p-2 flex gap-2">
                <TextField label="품목코드" variant="outlined" fullWidth size="small" value={itemCd.value}
                           onChange={itemCd.onChange}/>
                <TextField label="품목이름" variant="outlined" fullWidth size="small" value={itemNm.value}
                           onChange={itemNm.onChange}/>
                <TextField label="실행원가" variant="outlined" fullWidth size="small" value={itemMony.value}
                           onChange={itemMony.onChange}/>
            </div>

            {/*< ObtnUpdateBody/>*/}
        </>

    )
}