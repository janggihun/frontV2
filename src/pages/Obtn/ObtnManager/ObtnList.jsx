import {useEffect, useState} from "react";
import {getObtnList} from "../../../api/restApi.js";
import {ObtnSearchBox} from "./ObtnSearchBox.jsx";
import {formatDateTime} from "../../../common/common.js";
import {ListTable} from "../../../component/ListTable.jsx";
import {MyCalendar} from "../../../component/MyCalendar.jsx";

export const ObtnList = () => {

    const [obtnList, setObtnList] = useState(); //원천 데이터
    const [searchMap, setSearchMap] = useState({});
    const [gridApi, setGridApi] = useState();

    //수주 리스트 취득
    const getData = async () => {

        const res_obtn = await getObtnList(searchMap)

        const cleanData = res_obtn.map(item => ({
            ...item,
            testView: '',
            inputDate: item.inputDate ? formatDateTime(item.inputDate) : '',
            updateDate: item.updateDate ? formatDateTime(item.updateDate) : ''
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
                    <MyCalendar  searchMap={searchMap}  setSearchMap={setSearchMap}/>
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
