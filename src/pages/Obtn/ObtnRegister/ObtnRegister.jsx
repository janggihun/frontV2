import {useEffect, useRef, useState} from "react";
import {MainTitle} from "../../../component/MainTitle.jsx";
import Button from "@mui/material/Button";
import {AgGridReact} from "ag-grid-react";
import ReactDOM from "react-dom";
import {Box, MenuItem, TextField} from "@mui/material";
import {useInput} from "../../../component/InputTag/useInput.jsx";
import {getAxios, postAxios} from "../../../api/restApi.js";
import {Status} from "../../../enum/enum.js";

export const ObtnRegister = () => {
    const obtnDtlGrid = useRef(null);

    const [obtnDtls, setObtnDtls] = useState([]);
    const [compList, setCompList] = useState([]);

    const compHdr = useInput();      //회사
    const stx = useInput();      //부가세
    const obtnMk = useInput();    //비고
    const obtnDt = useInput();  //납기일

    // 저장 버튼 예시
    const save = async () => {

        const saveMap = {

            obtnDtls,
            compHdr : compList.filter(el=>el.id === compHdr.value)[0],
            stx: stx.value,
            obtnMk: obtnMk.value,
            obtnDt: obtnDt.value ? new Date(obtnDt.value).toISOString().slice(0, 19) : null
        }
        console.log("저장할 데이터:", saveMap);
        const url = "/api/obtnHdr/save";

        const res = await postAxios(url, saveMap);

        console.log(res)

    };
    // 행 추가
    const createObtnDtl = () => {
        setObtnDtls((prev) => {
            // 기존 행 sortIndex 재설정
            const updated = prev.map((el, i) => ({...el, sortIndex: i + 1}));

            // 새 행 추가
            const newRow = {
                rowId: Date.now() + Math.random(), // 고유 ID
                sortIndex: updated.length + 1,

                itemCd: "",
                itemNm: "",
                itemMony: "",
                obtnMony: "",
                obtnAmt: "",
            };

            return [...updated, newRow];
            // 선택 인덱스 갱신
        });
    };
    // 행 삭제
    const deleteObtnDtl = () => {
        if (!obtnDtlGrid.current) return;

        const selectedNodes = obtnDtlGrid.current.api.getSelectedNodes();
        if (selectedNodes.length === 0) {
            alert("삭제할 행을 선택하세요.");
            return;
        }

        const selectedIndexes = selectedNodes.map(node => node.rowIndex);

        setObtnDtls(prev => {
            // 선택되지 않은 행만 남기기
            const updated = prev.filter((_, idx) => !selectedIndexes.includes(idx));
            // sortIndex 다시 매기기
            return updated.map((row, i) => ({...row, sortIndex: i + 1}));
        });
    };
    // 같은 행 추가
    const copyObtnDtl = () => {
        if (!obtnDtlGrid.current) return;

        const selectedNodes = obtnDtlGrid.current.api.getSelectedNodes();
        if (selectedNodes.length === 0) {
            alert("복사할 행을 선택하세요.");
            return;
        }

        const selectedIds = selectedNodes.map(node => node.data.rowId);

        setObtnDtls(prev => {
            const updated = prev.map((row, i) => ({...row, sortIndex: i + 1}));
            const copiedRows = selectedNodes.map((node, idx) => ({
                ...node.data,
                rowId: Date.now() + Math.random(), // 복사본 고유 ID
                sortIndex: updated.length + idx + 1
            }));
            return [...updated, ...copiedRows];
        });

        // 체크 유지: 원본 행 체크 상태 유지
        setTimeout(() => {
            obtnDtlGrid.current.api.forEachNode(node => {
                if (selectedIds.includes(node.data.rowId)) {
                    node.setSelected(true);
                }
            });
        }, 0);
    };
    // 선택된 행 인덱스 관리
    const onRowClicked = (e) => {
        // 체크박스 클릭이면 동작 안함
        if (e.event.target.closest('.ag-checkbox-input')) return;

        // 소계/합계 행 무시
        if (e.data?.isSubtotal) return;


        // 일반 행 클릭 시 선택 토글
        e.node.setSelected(!e.node.isSelected());
    };

    //체크 행 위로 올리기
    const moveRowUp = () => {
        if (!obtnDtlGrid.current) return;

        const selectedNodes = obtnDtlGrid.current.api.getSelectedNodes();
        if (selectedNodes.length === 0) {
            alert("위로 이동할 행을 선택하세요.");
            return;
        }

        // 맨 위(1) 포함 시 이동 불가
        if (selectedNodes.some(node => node.data.sortIndex === 1)) {
            alert("맨 위 행은 더 위로 이동할 수 없습니다.");
            return;
        }

        setObtnDtls((prev) => {
            const copy = [...prev];

            // 선택된 sortIndex 기준 오름차순 정렬
            const selectedIndexes = selectedNodes.map(node => node.data.sortIndex).sort((a, b) => a - b);

            selectedIndexes.forEach(index => {
                const idx1 = copy.findIndex(r => r.sortIndex === index);
                const idx2 = copy.findIndex(r => r.sortIndex === index - 1);
                if (idx1 !== -1 && idx2 !== -1) {
                    [copy[idx1].sortIndex, copy[idx2].sortIndex] = [copy[idx2].sortIndex, copy[idx1].sortIndex];
                }
            });

            return copy.sort((a, b) => a.sortIndex - b.sortIndex);
        });

        // 이동 후에도 선택 유지
        setTimeout(() => {
            obtnDtlGrid.current.api.forEachNode(node => {
                node.setSelected(selectedNodes.some(sel => sel.data === node.data));
            });
        }, 0);
    };
    //체크행 아래로 내리기
    const moveRowDown = () => {
        if (!obtnDtlGrid.current) return;

        const selectedNodes = obtnDtlGrid.current.api.getSelectedNodes();
        if (selectedNodes.length === 0) {
            alert("아래로 이동할 행을 선택하세요.");
            return;
        }

        const maxIndex = obtnDtls.length;

        // 맨 아래 선택 시 이동 불가
        if (selectedNodes.some(node => node.data.sortIndex === maxIndex)) {
            alert("맨 아래 행은 더 아래로 이동할 수 없습니다.");
            return;
        }

        setObtnDtls((prev) => {
            const copy = [...prev];

            // 선택된 sortIndex 기준 내림차순 정렬
            const selectedIndexes = selectedNodes.map(node => node.data.sortIndex).sort((a, b) => b - a);

            selectedIndexes.forEach(index => {
                const idx1 = copy.findIndex(r => r.sortIndex === index);
                const idx2 = copy.findIndex(r => r.sortIndex === index + 1);
                if (idx1 !== -1 && idx2 !== -1) {
                    [copy[idx1].sortIndex, copy[idx2].sortIndex] = [copy[idx2].sortIndex, copy[idx1].sortIndex];
                }
            });

            return copy.sort((a, b) => a.sortIndex - b.sortIndex);
        });

        // 이동 후에도 선택 유지
        setTimeout(() => {
            obtnDtlGrid.current.api.forEachNode(node => {
                node.setSelected(selectedNodes.some(sel => sel.data === node.data));
            });
        }, 0);
    };


    // 품목 코드 가지고 오는 컴포넌트
    const ItemCodeEditor = (props) => {
        const [isOpen, setIsOpen] = useState(true);
        const [search, setSearch] = useState("");
        const [originItems, setOriginItems] = useState([]);

        const [items, setItems] = useState();

        // const filteredItems = items.filter(item =>
        //     item.toLowerCase().includes(search.toLowerCase())
        // );

        // 모달에서 값 선택
        const searchStart = () => {
            const searchItems = originItems.filter((item) => {
                return item.toLowerCase().includes(search.toLowerCase())
            })
            if (searchItems) {
                setItems(searchItems)
            } else {
                setItems(originItems)
            }

        }

        useEffect(() => {
            const getData = async () => {

                const url = "/api/itemHdr/read"

                const res = await getAxios(url, null)

                if (res.status === Status.SUCCESS) {
                    console.log(res.data)
                    setOriginItems(res.data);
                }

            }
            getData()
        }, []);
        const selectValue = (newVal) => {

            if (props.node && props.colDef?.field !== undefined) {
                const rowIndex = props.node.rowIndex;

                setObtnDtls((prev) => {
                    const copy = [...prev];

                    // 기존 수주량, 수주단가 가져오기
                    const obtnAmt = Number(copy[rowIndex].obtnAmt) || 0;
                    const obtnMony = Number(copy[rowIndex].obtnMony) || newVal.itemMony || 0;

                    copy[rowIndex] = {
                        ...copy[rowIndex],
                        itemHdr:{itemId:newVal.itemId},
                        itemCd: newVal.itemCd,
                        itemNm: newVal.itemNm,
                        itemMony: newVal.itemMony,
                        itemTotMony: obtnAmt * newVal.itemMony,  // 수주량 * 품목단가
                        obtnMony: obtnMony,                       // 수주단가 유지 or 신규 단가
                        obtnTotMony: obtnAmt * obtnMony,         // 수주량 * 수주단가
                    };
                    return copy;
                });
            }

            setIsOpen(false);
        };

        if (!isOpen) return null;

        return ReactDOM.createPortal(
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
                <div className="bg-white w-[600px] h-[600px] max-w-full p-6 rounded-2xl shadow-xl flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                        품목 선택
                    </h2>

                    {/* 검색창 */}
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="검색..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <Button
                            variant="contained"
                            className="h-[40px] !min-h-0 !px-4"
                            onClick={() => {
                                searchStart()
                            }}
                        >
                            검색
                        </Button>
                    </div>
                    {/* 리스트 */}
                    <div className="flex flex-col gap-2  max-h-80 mb-4">
                        <div className="flex-1">
                            <div className="ag-theme-alpine" style={{height: "400px", width: "100%"}}>
                                <AgGridReact
                                    rowData={items || originItems}  // 검색 결과나 전체 품목
                                    columnDefs={[
                                        { headerName: "품목코드", field: "itemCd", width: 150, cellStyle: {textAlign: "center"}},
                                        { headerName: "품목명", field: "itemNm", flex: 1 , cellStyle: {textAlign: "center"}},
                                        { headerName: "단가", field: "itemMony", width: 120,cellStyle: {textAlign: "right"},
                                            valueFormatter: params => params.value ? `${Number(params.value).toLocaleString("ko-KR")} 원` : ""
                                        },
                                    ]}
                                    rowSelection="single"
                                    onRowClicked={(e) => selectValue(e.data)}
                                />
                            </div>
                        </div>

                    </div>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            props.stopEditing();
                        }}
                        className="mt-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        닫기
                    </button>
                </div>
            </div>,
            document.body
        );
    };

    // 컬럼 정의
    const columns = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: (params) => {
                // 소계 또는 합계 행은 체크박스 비활성화

                return !(params.data?.isSubtotal);
            },
            width: 40,
            pinned: 'left',
        },
        {field: "sortIndex", headerName: "순서", width: 70, cellStyle: {textAlign: "center"}},

        {
            field: "itemCd",
            headerName: "품목코드",
            width: 300,
            cellStyle: {textAlign: "center"},
            editable: true,
            cellClass: "editable-cell",
            cellEditor: ItemCodeEditor,

        },
        {
            field: "itemNm",
            headerName: "품목명",
            width: 300,
            cellStyle: {textAlign: "center"},
            // editable: true
        },

        {
            field: "itemMony",
            headerName: "품목단가",
            width: 150,
            cellStyle: {textAlign: "center"},
            // editable: true,
            valueFormatter: (params) => params.value ? `${Number(params.value).toLocaleString("ko-KR")} 원` : ""
        },
        {
            field: "itemTotMony",
            headerName: "품목 총액",
            width: 150,
            cellStyle: {textAlign: "center"},
            // editable: true,
            valueFormatter: (params) => params.value ? `${Number(params.value).toLocaleString("ko-KR")} 원` : "",
        },
        {
            field: "obtnAmt",
            headerName: "수주량",
            width: 100,
            cellStyle: {textAlign: "center"},
            editable: true,
            cellClass: "editable-cell",
            valueFormatter: (params) => params.value ? `${Number(params.value).toLocaleString("ko-KR")} 개` : "",
            // 값 변경 시 품목총액 계산
            onCellValueChanged: (params) => {
                const rowIndex = params.node.rowIndex;
                const newAmt = Number(params.newValue) || 0;
                const itemMony = Number(params.data.itemMony) || 0;
                const obtnMony = Number(params.data.obtnMony) || 0;

                setObtnDtls((prev) => {
                    const copy = [...prev];
                    copy[rowIndex] = {
                        ...copy[rowIndex],
                        obtnAmt: newAmt,
                        itemTotMony: newAmt * itemMony,   // 품목 총액
                        obtnTotMony: newAmt * obtnMony,   // 수주 총액
                    };
                    return copy;
                });
            },
        },
        {
            field: "obtnMony",
            headerName: "수주단가",
            width: 150,
            cellStyle: {textAlign: "center"},
            editable: true,
            cellClass: "editable-cell",
            valueFormatter: (params) => params.value ? `${Number(params.value).toLocaleString("ko-KR")} 원` : "",

            onCellValueChanged: (params) => {
                const rowIndex = params.node.rowIndex;
                const newMony = Number(params.newValue) || 0;
                const obtnAmt = Number(params.data.obtnAmt) || 0;

                setObtnDtls((prev) => {
                    const copy = [...prev];
                    copy[rowIndex] = {
                        ...copy[rowIndex],
                        obtnMony: newMony,
                        obtnTotMony: newMony * obtnAmt,  // ✅ 자동 계산
                    };
                    return copy;
                });
            },

        },
        {
            field: "obtnTotMony",
            headerName: "수주 총액",
            width: 150,
            cellStyle: {textAlign: "center"},
            // editable: true,
            valueFormatter: (params) => params.value ? `${Number(params.value).toLocaleString("ko-KR")} 원` : "",
        },


    ];

    // 초기 행 하나 생성
    useEffect(() => {
        createObtnDtl();
    }, []);
    useEffect(() => {
        const getData = async () => {

            const url = "/api/comp/read"

            const res = await getAxios(url, null)

            if (res.status === Status.SUCCESS) {
                setCompList(res.data);
            }

        }
        getData()
    }, []);


    return (
        <>
            <MainTitle title={"* 수주 정보 입력"}/>
            <div className="p-1 w-[100%] h-[50px] flex justify-end">
                <Button variant="contained" onClick={save}>
                    저장하기
                </Button>
            </div>
            {/*수주시작*/}
            <div className="w-full p-2 flex gap-2">
                {/* 회사명 */}
                <div className="flex w-1/4 shadow-sm g overflow-hidden">
                    {/* 왼쪽 라벨 */}
                    <div className="w-1/2 flex items-center justify-center bg-gray-200">
                        <Box className="font-semibold text-gray-700">납기일</Box>
                    </div>
                    {/* 오른쪽 입력 */}
                    <div className="w-1/2">
                        <TextField
                            type="date"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={obtnDt.value}
                            onChange={obtnDt.onChange}
                        />
                    </div>
                </div>
                {/*부가세*/}
                <div className="flex w-1/4 shadow-sm overflow-hidden">
                    {/* 왼쪽 라벨 */}
                    <div className="w-1/2 flex items-center justify-center bg-gray-200">
                        <Box className="font-semibold text-gray-700">부가세</Box>
                    </div>
                    {/* 오른쪽 드롭다운 */}
                    <div className="w-1/2">
                        <TextField
                            variant="outlined"
                            fullWidth
                            size="small"
                            select   // ✅ select 속성 추가
                            value={stx.value}
                            onChange={stx.onChange}
                        >
                            <MenuItem value="EXCLUDE">부가세제외</MenuItem>
                            <MenuItem value="SEPARATE">부가세별도</MenuItem>
                            <MenuItem value="INCLUDE">부가세포함</MenuItem>
                            {/* 원하는 옵션 추가 가능 */}
                        </TextField>
                    </div>
                </div>
                {/*회사*/}
                <div className="flex w-1/4 shadow-sm overflow-hidden">
                    {/* 왼쪽 라벨 */}
                    <div className="w-1/2 flex items-center justify-center bg-gray-200">
                        <Box className="font-semibold text-gray-700">회사명</Box>
                    </div>

                    {/* 오른쪽 드롭다운 */}
                    <div className="w-1/2">
                        <TextField
                            select
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={compHdr.value}   // 선택된 value
                            onChange={compHdr.onChange}
                        >
                            {compList.map((comp) => (
                                <MenuItem key={comp.id} value={comp.id}>
                                    {comp.compNm}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                {/* 공란*/}
                <div className="flex w-1/4 shadow-sm  overflow-hidden">
                  
                </div>
            </div>

            <div className="w-full p-2 flex gap-2">
                {/* 수주비고 */}
                <div className="flex w-1/2 shadow-sm  overflow-hidden">
                    <div className="w-1/4 flex items-center justify-center bg-gray-200">
                        <Box className="font-semibold text-gray-700">수주비고</Box>
                    </div>
                    <div className="w-3/4">
                        <TextField
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={obtnMk.value}
                            onChange={obtnMk.onChange}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full h-[15px]"></div>
            {/*수주상세시작*/}
            <MainTitle title={"* 수주 상세"}/>
            {/* 위/아래 버튼 + 행 추가 버튼 */}
            <div className="flex gap-2 mb-2">
                <Button variant="contained" onClick={moveRowUp}>
                    ▲ 위로
                </Button>
                <Button variant="contained" onClick={moveRowDown}>▼ 아래로 </Button>
                <Button variant="contained" color={"success"} onClick={copyObtnDtl}>
                    같은 행 추가
                </Button>
                <Button variant="contained" onClick={createObtnDtl}>
                    행 추가
                </Button>
                <Button variant="contained" color={"error"} onClick={deleteObtnDtl}>
                    행 삭제
                </Button>
            </div>

            {/* AG Grid */}
            <div className="ag-theme-alpine" style={{height: "400px", width: "100%"}}>
                <AgGridReact
                    ref={obtnDtlGrid}
                    rowData={obtnDtls}
                    columnDefs={columns}
                    rowSelection="multiple"
                    onRowClicked={onRowClicked}
                    // enableCellTextSelection={true}
                    // suppressRowClickSelection={false}
                    suppressRowClickSelection={true}    //여러개 누르개 하기
                    animateRows={true}
                    // domLayout="autoHeight"  // ✅ 자동 높이
                    onSortChanged={() => {
                        if (!obtnDtlGrid.current) return;

                        // 현재 화면에 보이는 순서대로 rowData 가져오기
                        const newData = [];
                        obtnDtlGrid.current.api.forEachNodeAfterFilterAndSort((node) => {
                            newData.push({...node.data});
                        });

                        // 순서 재설정
                        const updated = newData.map((row, i) => ({...row, sortIndex: i + 1}));

                        // 상태 업데이트
                        setObtnDtls(updated);
                    }}
                />
            </div>

        </>
    );
};
