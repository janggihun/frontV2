// import {useEffect, useState} from "react";
// import {getCompRead, postAxios} from "../../../api/restApi.js";
// import {Status} from "../../../enum/enum.js";
// import {useNavigate} from "react-router-dom";
// import {InputText} from "../../../component/InputTag/inputText.jsx";
// import {useInput} from "../../../component/InputTag/useInput.jsx";
// import {InputSelectBox} from "../../../component/InputTag/InputSelectBox.jsx";
// import {useDispatch} from "react-redux";
// import {closeLoading, openLoading} from "../../../store/LoadingSlice.jsx";
// import Button from '@mui/material/Button';
// import {Autocomplete, TextField} from "@mui/material";
//
// export const ObtnRegisterHead = (props) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const SeachBoxHeight = 80;
//     const [compList, setCompList] = useState()
//
//     //INPUT태그
//     const obtnNm = useInput();      //수주번호
//     const plceNm = useInput();      //장소
//     const obtnMk = useInput();      //비고
//     const mony = useInput();        //수주금액
//     const comp = useInput();        //회사
//
//     const handleSubmit = async () => {
//
//         const saveMap = {
//             obtnNm: obtnNm.value,
//             plceNm: plceNm.value,
//             obtnMk: obtnMk.value, //비고
//             mony: mony.value,
//             compId: comp.value
//         };
//
//         // console.log(saveMap)
//         const url = "/api/v1/obtn/save";
//         const res = await postAxios(url, saveMap);
//
//         if (res.status === Status.SUCCESS) {
//             alert(res.data);
//
//             return navigate("/obtn/manager");
//         }
//
//     };
//
//     useEffect(() => {
//
//         const getData = async () => {
//             dispatch(openLoading())
//             const res_comp = await getCompRead();
//             //전처리
//             // res_comp.forEach((el) => {
//             //     el.value = el.id;
//             //     el.name = el.compNm;
//             // })
//             res_comp.forEach((el) => {
//
//                 el.label = el.compNm;
//             })
//             setCompList(res_comp)
//             dispatch(closeLoading())
//         }
//         getData()
//
//     }, [])
//     return (
//         <>
//             <div className="w-full h-[5%] flex justify-end items-center bg-red-100">
//                 <div>
//                     <Button variant="contained" onClick={handleSubmit}> 저장하기</Button>
//                 </div>
//             </div>
//
//             <div className="p-4">
//                 <div className="grid grid-cols-4 divide-x divide-y ">
//                     <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
//                         <InputText label="수주번호" {...obtnNm} disabled={true}/>
//                     </div>
//                     <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
//                         {/* <InputText label="수주금액" {...mony} /> */}
//                     </div>
//                     <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
//                         {/* <InputText label="수주금액" {...mony} /> */}
//                     </div>
//                     <div className={`flex items-center h-[${SeachBoxHeight}px]`}>
//                         {/* <InputText label="수주금액" {...mony} /> */}
//                     </div>
//                     {/*<div className={`flex items-center h-[${SeachBoxHeight}px]`}>*/}
//                     {/*    <InputSelectBox label="회사명" {...comp} list={compList}/>*/}
//                     {/*</div>*/}
//
//                     <Autocomplete
//                         disablePortal
//                         options={compList}
//                         sx={{width: 500}}
//                         renderInput={(params) => <TextField {...params} label="회사명"/>}
//                         onChange={(event, newValue) => {
//                             comp.changeValue(newValue.id)
//                         }}
//                     />
//                     <TextField
//                         id="outlined-required"
//                         label="현장명"
//                         sx={{width: '100%', height: "50px"}}
//
//                         // defaultValue="Hello World"
//                         onChange={(e) => {
//                             // obtnMk.onChange(e)
//                         }}
//                     />
//
//                     <TextField
//                         id="outlined-required"
//                         label="비고"
//                         sx={{width: '100%', height: "50px"}}
//
//                         // defaultValue="Hello World"
//                         onChange={(e) => {
//                             obtnMk.onChange(e)
//                         }}
//                     />
//
//                     <TextField
//                         id="outlined-required"
//                         label="수주금액"
//                         sx={{width: '100%', height: "50px"}}
//
//                         // defaultValue="Hello World"
//                         onChange={(e) => {
//                             mony.onChange(e)
//                         }}
//                     />
//
//                 </div>
//
//
//             </div>
//         </>
//     );
// };
