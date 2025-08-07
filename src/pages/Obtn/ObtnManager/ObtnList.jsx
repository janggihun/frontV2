import { useEffect, useRef, useState } from "react";
import { getObtnList } from "../../../api/restApi.js";
import { AgGridReact } from 'ag-grid-react';
import { ObtnSearchBox } from "./ObtnSearchBox.jsx";
import { formatDateTime } from "../../../common/common.js";
import { ListTable } from "../../../component/ListTable.jsx";

export const ObtnList = () => {

    const [obtnList, setObtnList] = useState([]); //원천 데이터

    useEffect(() => {
        const getData = async () => {

            const res_obtn = await getObtnList()
            const cleanData = res_obtn.map(item => ({
                ...item,
                testView: '',
                inputDate: item.inputDate ? formatDateTime(item.inputDate) : '',
                updateDate: item.updateDate ? formatDateTime(item.updateDate) : ''
            }));
            setObtnList(cleanData);
            //초기화
        }
        getData()

    }, []);


    return (
        <div className="w-full">

            {/* 검색조건 */}
            <ObtnSearchBox obtnList={obtnList} />
            {/* 데이터 테이블 */}
            <div className="ag-theme-balham" style={{ height: 300, width: '100%' }}>
                {/* 커스텀리스트 */}
                {obtnList.length > 0 && <ListTable originList={obtnList} />}
                <div className="w-[100%] h-[30px]"></div>
            </div>
        </div>
    );
};
