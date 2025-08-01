import { useEffect, useRef, useState } from "react";
import { getAxios } from "../../../api/restApi.js";
import { Status } from "../../../enum/enum.js";
import { AgGridReact } from 'ag-grid-react';
import { formatDateTime } from "../../../common/common.js";



export const ObtnList = () => {

    const [obtnList, setObtnList] = useState();

    //검색 조건
    const searchMap = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { field: 'id', width: 100, filter: true, headerName: '번호' },
        { field: 'inputId', width: 100, filter: true, headerName: '입력 ID' },
        { field: 'inputDate', width: 200, filter: 'agDateColumnFilter', headerName: '입력 날짜' }
    ]);
    const getObtnList = async () => {
        const url = "/api/v1/obtn/read"
        const res = await getAxios(url);
        if (res.status === Status.SUCCESS) {
            // 날짜 필드를 Date 객체로 변환
            const cleanData = res.data.map(item => ({
                ...item,
                inputDate: item.inputDate ? formatDateTime(item.inputDate) : ''
            }));
            setObtnList(cleanData)
        }
    }

    useEffect(() => {
        const getData = async () => {
            //obtn 리스트 취득
            await getObtnList()
        }
        getData()
    }, [])
    //"ag-theme-balham" 여러종류 있음 찾아서 테마 변경가능
    return (
        <div className="ag-theme-balham" style={{ height: 300, width: 800 }}>
            <AgGridReact
                rowHeight={40}
                columnDefs={columnDefs}
                rowData={obtnList}
            />
        </div>
    );


}