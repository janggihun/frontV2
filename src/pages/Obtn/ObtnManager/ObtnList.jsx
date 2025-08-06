import { useEffect, useRef, useState } from "react";
import { getObtnList } from "../../../api/restApi.js";
import { AgGridReact } from 'ag-grid-react';
import { ObtnSearchBox } from "./ObtnSearchBox.jsx";
import { formatDateTime } from "../../../common/common.js";
import { ListTable } from "../../../component/ListTable.jsx";

export const ObtnList = () => {

    const [obtnList, setObtnList] = useState([]); //원천 데이터
    const [renderList, setRenderList] = useState([]); // 소계/합계 포함된 렌더링 데이터
    const [sortOrder, setSortOrder] = useState('asc');
    const [category, setCategory] = useState("testView")
    const gridApi = useRef()

    const columnDefs = [
        {

            headerCheckboxSelection: true,
            checkboxSelection: (params) => {
                // 소계 또는 합계 행은 체크박스 비활성화
                return !(params.data?.isSubtotal || params.data?.isTotal);
            },
            width: 40,
            pinned: 'left',
        },
        {
            field: 'testView',
            width: 110,
            headerName: 'No',
            cellStyle: { textAlign: 'center' },
            headerClass: category === 'testView' ? 'highlight-header' : ''
            , cellRenderer: (params) => {
                return params.value;
            },
        },
        {
            field: 'obtnNm',
            width: 110,
            headerName: '수주번호',
            cellStyle: { textAlign: 'center' },
            headerClass: category === 'obtnNm' ? 'highlight-header' : '',
        },
        {
            field: 'mony',
            width: 110,
            headerName: '수주금액',
            cellStyle: { textAlign: 'right' },
            headerClass: category === 'mony' ? 'highlight-header' : '',
            valueFormatter: params => {
                if (params.value == null) return '';
                return params.value.toLocaleString();  // 1000000 → "1,000,000"
            },

        },
        {
            field: 'compNm',
            width: 130,
            headerName: '거래처',
            cellStyle: { textAlign: 'center' },
            headerClass: category === 'compNm' ? 'highlight-header' : '',

        },
        {
            field: 'compAdr',
            width: 130,
            headerName: '주소',
            cellStyle: { textAlign: 'center' },
            headerClass: category === 'compAdr' ? 'highlight-header' : '',
        },
        {
            field: 'inputId',
            width: 100,
            headerName: '작성자',
            cellStyle: { textAlign: 'center' },
            headerClass: category === 'inputId' ? 'highlight-header' : '',
        },
        {
            field: 'inputDate',
            width: 200,
            headerName: '작성 날짜',
            cellStyle: { textAlign: 'center' },
            headerClass: category === 'inputDate' ? 'highlight-header' : '',
            filterParams: {
                comparator: (filterDate, cellValue) => {
                    const cellDate = new Date(cellValue);
                    if (cellDate < filterDate) return -1;
                    if (cellDate > filterDate) return 1;
                    return 0;
                },
                browserDatePicker: true
            },
            valueFormatter: params => {
                if (!params.value) return '';
                return params.value
                //   const date = new Date(params.value);
                // return date.toLocaleString();
            }
        },
        {
            field: 'updateId',
            width: 100,
            headerName: '수정자',
            cellStyle: { textAlign: 'center' },
            headerClass: category === 'updateId' ? 'highlight-header' : '',
        },
        {
            field: 'updateDate',
            width: 200,
            headerName: '수정 날짜',
            cellStyle: { textAlign: 'center' },
            headerClass: category === 'updateDate' ? 'highlight-header' : '',
            filterParams: {
                comparator: (filterDate, cellValue) => {
                    const cellDate = new Date(cellValue);
                    if (cellDate < filterDate) return -1;
                    if (cellDate > filterDate) return 1;
                    return 0;
                },
                browserDatePicker: true
            },
            valueFormatter: params => {
                if (!params.value) return '';
                return params.value
                //   const date = new Date(params.value);
                // return date.toLocaleString();
            }
        },
        {
            field: 'obtnMk',
            width: 100,
            headerName: '비고',
            cellStyle: { textAlign: 'center' },
            headerClass: category === 'obtnMk' ? 'highlight-header' : '',
        },
    ]


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
            <ObtnSearchBox obtnList={obtnList} gridApi={gridApi} />
            {/* 데이터 테이블 */}

            <div className="ag-theme-balham" style={{ height: 300, width: '100%' }}>

                {/* 커스텀리스트 */}
                {obtnList.length > 0 && <ListTable originList={obtnList} columnDefs={columnDefs} />}
                {obtnList.length > 0 && <ListTable originList={obtnList} columnDefs={columnDefs} />}
            </div>
        </div>
    );
};
