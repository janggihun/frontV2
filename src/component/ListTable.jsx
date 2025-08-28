import {useEffect, useRef, useState} from "react";
import {AgGridReact} from 'ag-grid-react';
import {processDataWithSubtotals} from "../common/common.js";
import {ObtnList_columnDefs} from "../pages/Obtn/ObtnManager/columnDefs.js";
import {useNavigate} from "react-router-dom";

export const ListTable = (props) => {
    const navigate = useNavigate();
    //부모에게 받은 데이터
    const originList = props.originList;

    const categoryList = ObtnList_columnDefs.map(col => col.field).filter(field => field !== undefined);
    // console.log(categoryList)

    //상태 변환 데이터
    const [sortOrder, setSortOrder] = useState('asc');
    const [category, setCategory] = useState(categoryList[3])
    const [renderList, setRenderList] = useState([])
    const [contextMenu, setContextMenu] = useState({visible: false, x: 0, y: 0, rowData: null}); //우클릭

    const gridRef = useRef(null);

// 합계를 계산할 컬럼 리스트
    const columnsToSum = ['mony'];

// 소계 행 제외
    const filteredList = renderList.filter(row => !row.isSubtotal);

// 합계 계산
    const totalRow = {No: '전체 합계'};
    columnsToSum.forEach(col => {
        totalRow[col] = filteredList.reduce((sum, row) => sum + (Number(row[col]) || 0), 0);
    });

// pinnedBottomRowData에 넣기
    const pinnedBottomRowData = [totalRow];

    //우클릭시
    useEffect(() => {
        const handleClick = () => setContextMenu({...contextMenu, visible: false});
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [contextMenu]);

    //거래처 눌러서 sort변경시 제랜더
    useEffect(() => {

        if (category === "0") return;
        // setRenderList(processDataWithSubtotals(originList, category, sortOrder));
        setRenderList(originList)
    }, [sortOrder, category, originList])

    const onHeaderClick = (e) => {
        // console.log("클릭한 컬럼:", e.column.getColId());
        if (e.column.getColId() === category) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setCategory(e.column.getColId())
        }
    };
    const onRowClicked = (e) => {
        // 체크박스 클릭이면 동작 안함
        if (e.event.target.closest('.ag-checkbox-input')) return;
        // 소계/합계 행 무시
        if (e.data?.isSubtotal) return;
        // 일반 행 클릭 시 선택 토글
        e.node.setSelected(!e.node.isSelected());
        // console.log(e.node)
        //현재 클릭된 리스트를 넣어줘야한다.
        // 선택된 행 RowNode (index 포함)
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        if (selectedNodes.length === 0) {
            props.setObtn(null);
        } else {
            props.setObtn(selectedNodes[0].data);
        }

    }

    const getRowStyle = (params) => {
        if (params.data?.isSubtotal) {
            return {backgroundColor: '#f0f8ff', fontWeight: 'bold'}; // 소계
        }

        if (params.node.rowPinned === 'bottom') {
            return {background: '#FFDAB9', fontWeight: 'bold'}; // 복숭아색
        }

        return null;
    }
    //완벽히 로드후에 api취득
    const renderOnload = () => {
        props.setGridApi(gridRef.current.api);
    }

    //컨텍스트 매뉴 유료
    // const getContextMenuItems = (params) => [
    //     {
    //         name: '삭제',
    //         action: () => alert(params.node.data.name)
    //     },
    //     'copy' // Community에서도 기본 제공 복사 메뉴 가능
    // ];

    // ① 우클릭 이벤트 함수 정의
    const onCellContextMenu = (params) => {
        params.event.preventDefault();
        setContextMenu({
            visible: true,
            x: params.event.clientX,
            y: params.event.clientY,
            rowData: params.node.data
        });
    };

    return (
        <>
            <div className="w-full">
                {/* 데이터 테이블 */}
                <div className="ag-theme-balham" style={{height: 300, width: '100%'}}
                     onContextMenu={(e) => e.preventDefault()} // 전체 브라우저 메뉴 차단
                >
                    <AgGridReact
                        defaultColDef={{
                            sortable: false                     //헤더 클릭 시 정렬 막기
                        }}
                        onFirstDataRendered={renderOnload}
                        ref={gridRef}
                        rowClass="custom-row-style"
                        rowHeight={45}
                        rowSelection={'single'}               //여러샐 동시 체크박스가능

                        rowData={renderList}
                        columnDefs={ObtnList_columnDefs}
                        suppressRowClickSelection={true}
                        onColumnHeaderClicked={onHeaderClick}   //열 헤더 클릭
                        animateRows={false}                     //에니매이션 중지

                        getRowStyle={getRowStyle}               //소계,합계 색 입히는 함수
                        onRowClicked={onRowClicked}             //행 클릭시 이벤트
                        // pinnedBottomRowData={pinnedBottomRowData}   //맨아래 푸터고정
                        onCellContextMenu={onCellContextMenu} //우클릭
                        // getContextMenuItems={getContextMenuItems} //유료
                        // suppressContextMenu={false} // 필수        //유료


                    />
                </div>

            </div>

            {/*우클릭 모달*/}
            {contextMenu.visible && (
                <div
                    style={{
                        position: 'fixed',
                        top: contextMenu.y,
                        left: contextMenu.x,
                        background: '#ffffff',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        padding: '4px 0',
                        zIndex: 1000,
                        minWidth: '160px',

                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                    }}
                >
                    <div
                        style={{
                            padding: '8px 16px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                        }}
                        onClick={() => {
                            if (!contextMenu.rowData.obtnNm) return;
                            // 선택된 행이 1건이 아닐 경우 무시
                            if (!gridRef.current) return;
                            const selectedRows = gridRef.current.api.getSelectedRows();
                            if (selectedRows.length !== 1) {
                                alert('수주 수정은 1건만 선택 가능합니다.');
                                setContextMenu({...contextMenu, visible: false});
                                return;
                            }
                            const row = selectedRows[0];
                            //클릭한건 전부
                            console.log('row', row);
                            // alert(`수주 : ${row.obtnNm} 건을 수정합니다.`);
                            navigate(`/obtn/update/${row.id}`)
                            setContextMenu({...contextMenu, visible: false});
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        수주수정하기
                    </div>
                    <div
                        style={{
                            padding: '8px 16px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                        }}
                        onClick={() => {
                            if (!contextMenu.rowData.obtnNm) return;
                            //클릭한건 전부
                            const selectedRows = gridRef.current.api.getSelectedRows();
                            if (selectedRows.length === 0) return;

                            // 선택된 모든 행의 수주번호 가져오기
                            const names = selectedRows.map(row => row.obtnNm).join(', ');
                            alert(`수주 : ${names} 건을 취소 하시겠습니까?`);
                            setContextMenu({...contextMenu, visible: false});
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        수주취소하기
                    </div>
                </div>
            )}

        </>
    );
};
