import { useEffect, useRef, useState } from "react";
import { getObtnList } from "../../../api/restApi.js";

import { AgGridReact } from 'ag-grid-react';
import { ObtnSearchBox } from "./ObtnSearchBox.jsx";
import { formatDateTime } from "../../../common/common.js";


export const ObtnList = () => {

    const [check, setCheck] = useState();
    const [obtnList, setObtnList] = useState([]); //원천 데이터
    const [renderList, setRenderList] = useState([]); // 소계/합계 포함된 렌더링 데이터
    const [sortOrder, setSortOrder] = useState('asc');

    const gridApi = useRef()

    const [columnDefs] = useState([
        {
            headerCheckboxSelection: true,   // 헤더에 전체 선택 체크박스
            // checkboxSelection: true,         // 각 행에 체크박스
            checkboxSelection: (params) => {
                // 소계 또는 합계 행은 체크박스 비활성화
                return !(params.data?.isSubtotal || params.data?.isTotal);
            },
            width: 40,
            pinned: 'left',
        },
        {
            field: 'testView', width: 110, headerName: 'No'
            , cellRenderer: (params) => {
                return params.value;
            },
        },
        { field: 'obtnNm', width: 110, headerName: '수주번호' },
        {
            field: 'mony', width: 110, headerName: '수주금액',

            valueFormatter: params => {
                if (params.value == null) return '';
                return params.value.toLocaleString();  // 1000000 → "1,000,000"
            },

        },
        {
            field: 'compNm', width: 130, headerName: '거래처',
            headerClass: 'custom-header-class',

        },
        { field: 'siteNm', width: 130, headerName: '현장명' },
        { field: 'inputId', width: 100, headerName: '작성자' },
        {
            field: 'inputDate', width: 200, headerName: '작성 날짜',
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
                const date = new Date(params.value);
                return date.toLocaleString();
            }
        },
        { field: 'updateId', width: 100, headerName: '수정자' },
        {
            field: 'updateDate', width: 200, headerName: '수정 날짜',
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
                const date = new Date(params.value);
                return date.toLocaleString();
            }
        },
        { field: 'obtnMk', width: 100, headerName: '비고' },
    ]);
    const defaultColDef = {
        sortable: false,
    };



    useEffect(() => {
        const getData = async () => {

            const res_obtn = await getObtnList()
            const cleanData = res_obtn.map(item => ({
                ...item,
                testView: '',
                inputDate: item.inputDate ? formatDateTime(item.inputDate) : '',
                updateDate: item.updateDate ? formatDateTime(item.updateDate) : ''
            }));

            const newList = processDataWithSubtotals(cleanData);
            setObtnList(cleanData);
            setRenderList(newList)
        }
        getData()

    }, []);

    //가장 최신으로 항상 리렌더
    useEffect(() => {
        const handler = () => {
            if (sortOrder === 'asc') {
                setSortOrder('desc');
            } else {
                setSortOrder('asc');
            }
        };

        const headers = document.querySelectorAll('.ag-header-cell[col-id="compNm"]');
        headers.forEach((header) => {
            header.addEventListener('click', handler)

        });

        return () => {
            headers.forEach(header => header.removeEventListener('click', handler));
        };
    });


    //거래처 눌러서 sort변경시 제랜더
    useEffect(() => {
        setRenderList(processDataWithSubtotals(obtnList, sortOrder));
    }, [sortOrder])

    // 거래처명 정렬
    const processDataWithSubtotals = (data) => {
        const sortedData = [...data].sort((a, b) =>
            sortOrder === 'asc'
                ? a.compNm.localeCompare(b.compNm)
                : b.compNm.localeCompare(a.compNm)
        );

        const result = [];
        let currentGroup = '';
        let subtotal = 0;
        let i = 1;
        sortedData.forEach((item, index) => {
            if (item.compNm !== currentGroup) {

                if (currentGroup !== '') {
                    i = 1
                    result.push({
                        compNm: '',
                        testView: '소계',
                        mony: subtotal,
                        isSubtotal: true,
                        inputDate: null,  // 날짜 필드는 비움
                        updateDate: null
                    });
                    subtotal = 0;
                }
                currentGroup = item.compNm;
            }
            item.testView = i;
            result.push(item);
            subtotal += Number(item.mony) || 0;

            if (index === sortedData.length - 1) {

                result.push({
                    compNm: '',
                    testView: '소계',
                    mony: subtotal,
                    isSubtotal: true,
                    inputDate: null,  // 날짜 필드는 비움
                    updateDate: null
                });

            }
            i++;
        });

        // 전체 합계
        const totalMony = sortedData.reduce((acc, cur) => acc + (Number(cur.mony) || 0), 0);
        result.push({
            compNm: '',
            testView: '전체 합계',
            mony: totalMony,
            isTotal: true,
        });

        return result;
    };

    const getRowStyle = (params) => {
        if (params.data.isSubtotal) {
            return { backgroundColor: '#f0f8ff', fontWeight: 'bold' };
        }
        if (params.data.isTotal) {
            return { backgroundColor: '#ffe4e1', fontWeight: 'bold' };
        }
        return null;
    };
    return (
        <div className="w-full">

            {/* 검색조건 */}
            <ObtnSearchBox obtnList={obtnList} gridApi={gridApi} />
            {/* 데이터 테이블 */}
            <div className="ag-theme-balham" style={{ height: 300, width: '100%' }}>
                <AgGridReact
                    // onFirstDataRendered={() => { renderCallBack() }}
                    ref={gridApi}

                    rowClass="custom-row-style"
                    rowSelection="multiple"
                    rowHeight={40}
                    columnDefs={columnDefs}
                    rowData={renderList}
                    suppressRowClickSelection={true} // 클릭시 자동 선택 막기
                    defaultColDef={defaultColDef}
                    isRowSelectable={params => !(params.data?.isSubtotal || params.data?.isTotal)} // 소계/합계는 선택 불가
                    getRowStyle={getRowStyle}
                    // onCellClicked={onCellClicked} // 클릭시 셀 클릭가능
                    onRowClicked={(event) => {
                        const isSelected = event.node.isSelected();
                        event.node.setSelected(!isSelected); // 토글 선택
                    }}
                />


            </div>
        </div>
    );
};
