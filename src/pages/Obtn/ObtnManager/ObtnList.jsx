import {useEffect, useState} from "react";
import {getAxios, getObtnList} from "../../../api/restApi.js";
import {ObtnSearchBox} from "./ObtnSearchBox.jsx";
import {formatDateTime, statusList} from "../../../common/common.js";
import {ListTable} from "../../../component/ListTable.jsx";
import {MyCalendar} from "../../../component/MyCalendar.jsx";
import {useDispatch} from "react-redux";
import {Status} from "../../../enum/enum.js";

export const ObtnList = () => {

    const [obtnList, setObtnList] = useState(); //원천 데이터
    const [searchMap, setSearchMap] = useState();
    const [gridApi, setGridApi] = useState();

    const dispatch = useDispatch();

    const cal_remainDt = (obtnDtStr) => {

        const obtnDt = new Date(obtnDtStr); // 수주 날짜
        const today = new Date();            // 오늘 날짜

// 날짜 차이 계산 (밀리초 단위)
        const diffMs = obtnDt - today;

// 밀리초 → 일수 변환
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return ` ${diffDays}일`;

    }
    //수주 리스트 취득

    const getData = async () => {

        const url = "/api/obtnHdr/read";

        const res_obtn = await getAxios(url);
        console.log(res_obtn)
        if (res_obtn.status !== Status.SUCCESS) {
            return alert("통신 오류");
        }
        const obtns = res_obtn.data;
        const cleanData = obtns.map(item => ({
            ...item,
            testView: '',
            status: statusList.find(el => el.eng === item.status).kor,
            compNm: item.compHdr.compNm,
            compAdr: item.compHdr.compAdr,
            remainDt : cal_remainDt(item.obtnDt),
            rgstDt: item.rgstDt ? formatDateTime(item.rgstDt) : '',
            updtDt: item.updtDt ? formatDateTime(item.updtDt) : ''
        }));
        setObtnList(cleanData);
        //초기화
    }
    // useEffect(() => {
    //     getData()
    // }, []);

    useEffect(() => {
        getData();
    }, [searchMap])


    if (obtnList) {
        return (
            <>
                <div className="w-[350px]">
                    {/* 캘린더 */}
                    <MyCalendar searchMap={searchMap} setSearchMap={setSearchMap}/>
                </div>

                <div className="w-[2%]"></div>
                <div className="w-[78%]">
                    {/* 검색조건 */}
                    <ObtnSearchBox obtnList={obtnList} setSearchMap={setSearchMap} searchMap={searchMap}
                                   gridApi={gridApi}/>
                    {/* 데이터 테이블 */}
                    <ListTable originList={obtnList} searchMap={searchMap} setGridApi={setGridApi}/>

                </div>
            </>
        );

    }

};
