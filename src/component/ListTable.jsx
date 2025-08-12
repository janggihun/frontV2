import { useEffect, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { processDataWithSubtotals } from "../common/common.js";
import { ObtnList_columnDefs } from "../pages/Obtn/ObtnManager/columnDefs.js";

export const ListTable = (props) => {

    //부모에게 받은 데이터
    const originList = props.originList;
    const columnDefs = ObtnList_columnDefs;
    const categoryList = columnDefs.map(col => col.field).filter(field => field !== undefined);
    // console.log(categoryList)
    //상태 변수 데이터
    const gridApi = useRef()

    //상태 변환 데이터
    const [sortOrder, setSortOrder] = useState('asc');
    const [category, setCategory] = useState(categoryList[0])
    const [renderList, setRenderList] = useState([])
    //가공 데이터


    //거래처 눌러서 sort변경시 제랜더
    useEffect(() => {




        setRenderList(processDataWithSubtotals(originList, category, sortOrder));

    }, [sortOrder, category])

    const onHeaderClick = (e) => {
        // console.log("클릭한 컬럼:", e.column.getColId());
        if (e.column.getColId() === category) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setCategory(e.column.getColId())
        }
    };
    const onRowClicked = (e) => {
        if (e.data?.isSubtotal || e.data?.isTotal) {
            return; // 클릭 무시
        }

        const isSelected = e.node.isSelected();
        e.node.setSelected(!isSelected); // 체크박스 선택 토글
    }
    const getRowStyle = (params) => {
        if (params.data?.isSubtotal) {
            return { backgroundColor: '#f0f8ff', fontWeight: 'bold' }; // 소계
        }
        if (params.data?.isTotal) {
            return { backgroundColor: '#ffe4e1', fontWeight: 'bold' }; // 합계
        }
        return null;
    }
    return (
        <div className="w-full">
            {/* 데이터 테이블 */}
            <div className="ag-theme-balham" style={{ height: 300, width: '100%' }}>
                <AgGridReact
                    defaultColDef={{
                        sortable: false                     //헤더 클릭 시 정렬 막기
                    }}
                    ref={gridApi}
                    rowClass="custom-row-style"
                    rowHeight={45}
                    rowSelection={'multiple'}               //여러샐 동시 체크박스가능
                    suppressRowClickSelection={true}
                    rowData={renderList}
                    onColumnHeaderClicked={onHeaderClick}   //열 헤더 클릭
                    animateRows={false}                     //에니매이션 중지
                    columnDefs={columnDefs}
                    getRowStyle={getRowStyle}               //소계,합계 색 입히는 함수
                    onRowClicked={onRowClicked}             //행 클릭시 이벤트
                />
            </div>
        </div>
    );
};
