import { useEffect, useRef, useState } from "react";
import { getAxios } from "../../../api/restApi.js";
import { Status } from "../../../enum/enum.js";
import { AgGridReact } from 'ag-grid-react';
import { formatDateTime } from "../../../common/common.js";


export const ObtnList = () => {
    const gridRef = useRef();
    const [check, setCheck] = useState();
    const [obtnList, setObtnList] = useState([]);

    // 검색 조건 상태
    const [searchParams, setSearchParams] = useState({
        obtnNm: '',
        clientNm: '',
        siteNm: '',
        startDate: '',
        endDate: '',
        mony: 0
    });

    const [columnDefs] = useState([
        {
            headerCheckboxSelection: true,   // 헤더에 전체 선택 체크박스
            checkboxSelection: true,         // 각 행에 체크박스
            width: 40,
            pinned: 'left',
        },
        {
            field: 'testView', width: 110, filter: true, headerName: '테스트'
            , cellRenderer: (params) => {
                return params.value;
            },
        },
        { field: 'obtnNm', width: 110, filter: true, headerName: '수주번호' },
        { field: 'mony', width: 110, filter: true, headerName: '수주금액' },
        { field: 'clientNm', width: 130, filter: true, headerName: '거래처' },
        { field: 'siteNm', width: 130, filter: true, headerName: '현장명' },
        { field: 'inputId', width: 100, filter: true, headerName: '작성자' },
        {
            field: 'inputDate', width: 200, filter: 'agDateColumnFilter', headerName: '작성 날짜',
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
                const date = new Date(params.value);
                return date.toLocaleString();
            }
        },
        { field: 'updateId', width: 100, filter: true, headerName: '수정자' },
        {
            field: 'updateDate', width: 200, filter: 'agDateColumnFilter', headerName: '수정 날짜',
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
                const date = new Date(params.value);
                return date.toLocaleString();
            }
        },
        { field: 'obtnMk', width: 100, filter: true, headerName: '비고' },
    ]);

    const buildQueryString = (params) => {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value) query.append(key, value);
        });
        return query.toString();
    };

    const getObtnList = async (params) => {
        let url = "/api/v1/obtn/read";
        const queryString = buildQueryString(params);
        if (queryString) url += `?${queryString}`;

        const res = await getAxios(url);
        if (res.status === Status.SUCCESS) {
            const cleanData = res.data.map(item => ({
                ...item,
                testView: <span className="test" >테스트</span>,
                inputDate: item.inputDate ? formatDateTime(item.inputDate) : '',
                updateDate: item.updateDate ? formatDateTime(item.updateDate) : ''
            }));
            setObtnList(cleanData);
        }
    };

    useEffect(() => {
        getObtnList({});
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };


    useEffect(() => {
        console.log(check)
        if (check === 1 && obtnList) {
            console.log("들어옴")
            const test = () => {

                console.log("테이블이 다 만들어진다음에 추가되는 함수")
                const list = document.querySelectorAll('.test')
                console.log(list)
                document.querySelectorAll('.test').forEach(elem => {
                    elem.addEventListener('click', function () {

                        alert('11111111')

                    })
                })

            }

            test()
        }


    }, [obtnList, check])
    return (
        <div className="w-full">
            {/* 검색 조건 영역 */}
            <div style={{
                marginBottom: 10,
                display: 'flex',
                gap: 8,
                flexWrap: 'nowrap',
                width: 1050,
                alignItems: 'center',
                fontSize: 14,
                overflowX: 'auto',
                width: '100%'
            }}>
                {/* 왼쪽 검정 동그라미 + 텍스트 + 총건수 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    flex: '0 0 auto',
                    userSelect: 'none',
                }}>
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: 'black',
                        }}
                    />
                    <span style={{ fontWeight: 'bold' }}>수주리스트</span>
                    <span style={{ marginLeft: 8, color: '#555', fontSize: 13 }}>
                        총 {obtnList.length}건
                    </span>
                </div>
                <div className="w-[8%]"></div>
                {/* 검색 input들 */}
                <input
                    type="text"
                    name="obtnNm"
                    placeholder="수주번호"
                    value={searchParams.obtnNm}
                    onChange={handleChange}
                    style={{ width: 140, padding: 6, borderRadius: 4, border: '1px solid #ccc', flexShrink: 0 }}
                />
                {/* 필요시 다른 input들도 여기에 추가 */}

                <label style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
                    시작날짜
                    <input
                        type="date"
                        name="startDate"
                        value={searchParams.startDate}
                        onChange={handleChange}
                        style={{ flex: '1 1 130px', padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                </label>

                <label style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
                    끝날짜
                    <input
                        type="date"
                        name="endDate"
                        value={searchParams.endDate}
                        onChange={handleChange}
                        style={{ flex: '1 1 130px', padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                </label>

                {/* 버튼을 오른쪽 끝으로 밀기 위한 빈 flex-grow 요소 */}
                <div style={{ flexGrow: 1 }} />

                <button
                    onClick={() => getObtnList(searchParams)}
                    style={{
                        padding: '6px 18px',
                        borderRadius: 4,
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: 14,
                        flex: '0 0 auto',
                    }}
                >
                    검색
                </button>
                <button
                    onClick={() => {
                        if (gridRef.current) {
                            const selectedRows = gridRef.current.api.getSelectedRows();

                            if (selectedRows.length === 0) {
                                alert("선택된 행이 없습니다.");
                                return;
                            }
                            //전체 내보내기
                            // gridRef.current.api.exportDataAsCsv({
                            //     fileName: '수주리스트.csv', // 저장될 파일명
                            //     columnSeparator: ',',      // 기본은 쉼표 (변경 가능)
                            // });

                            gridRef.current.api.exportDataAsCsv({
                                fileName: '수주리스트.csv',
                                onlySelected: true, // 선택된 행만 내보냄
                                columnSeparator: ',',
                            });
                        }
                    }}
                    style={{
                        padding: '6px 14px',
                        borderRadius: 4,
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: 14,
                        flex: '0 0 auto',
                        marginLeft: 8
                    }}
                >
                    CSV 다운로드
                </button>
                {/* 
                    csv다운로드시
                    
                    10만 행 이내: 대부분 문제 없음

                    30만 행 이내: 일부 구형 브라우저에서 메모리 문제 발생 가능

                    50만~100만 이상: 브라우저 환경에서는 비추천 → 서버 사이드 생성이 안전 */}
            </div>


            {/* 데이터 테이블 */}
            <div className="ag-theme-balham" style={{ height: 300, width: '100%' }}>
                <AgGridReact
                    onFirstDataRendered={() => { setCheck(1) }}
                    ref={gridRef}
                    rowClass="custom-row-style"
                    rowSelection="multiple"
                    rowHeight={40}
                    columnDefs={columnDefs}
                    rowData={obtnList}
                    suppressRowClickSelection={true} // 클릭시 자동 선택 막기
                // onRowClicked={(event) => {
                //     const isSelected = event.node.isSelected();
                //     event.node.setSelected(!isSelected); // 토글 선택
                // }}
                />
            </div>
        </div>
    );
};
