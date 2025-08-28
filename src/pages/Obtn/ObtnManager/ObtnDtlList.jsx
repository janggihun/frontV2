import {AgGridReact} from "ag-grid-react";
import {ObtnDtl_col} from "./columnDefs.js";
import {useEffect, useRef, useState} from "react";
import {getAxios} from "../../../api/restApi.js";
import {formatDateTime} from "../../../common/common.js";

export const ObtnDtlList = (props) => {

    const obtn = props.obtn;
    const [renderList, setRenderList] = useState([])
    const gridRef = useRef(null);

    useEffect(() => {
        const getData = async () => {
            if (!obtn) {
                return  setRenderList([])
            }
            const url = "/api/obtnDtl/read"
            const saveMap = {
                id: obtn.id
            }
            const res = await getAxios(url, saveMap);

            const list = res.data.map((el) => {
                el.rgstDt = formatDateTime(el.rgstDt)
                el.updtDt = formatDateTime(el.updtDt)
                return el
            })

            setRenderList(list)
        }

        getData()
    }, [obtn])

    return (
        <>

            {/* 왼쪽 검정 동그라미 + 텍스트 + 총건수 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                flex: '0 0 auto',
                userSelect: 'none',
                height : 40
            }}>
                <div
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: 'black',
                    }}
                />
                <span style={{fontWeight: 'bold'}}>수주리스트</span>
                <span style={{marginLeft: 8, color: '#555', fontSize: 13}}>
                    총 {renderList.length}건
                </span>
            </div>

            <AgGridReact
                defaultColDef={{
                    sortable: false                     //헤더 클릭 시 정렬 막기
                }}
                // onFirstDataRendered={renderOnload}
                ref={gridRef}
                rowClass="custom-row-style"
                rowHeight={45}
                rowSelection={'single'}               //여러샐 동시 체크박스가능

                rowData={renderList}
                columnDefs={ObtnDtl_col}
                suppressRowClickSelection={true}
                // onColumnHeaderClicked={onHeaderClick}   //열 헤더 클릭
                animateRows={false}                     //에니매이션 중지

                // getRowStyle={getRowStyle}               //소계,합계 색 입히는 함수
                // onRowClicked={onRowClicked}             //행 클릭시 이벤트
                // pinnedBottomRowData={pinnedBottomRowData}   //맨아래 푸터고정
                // onCellContextMenu={onCellContextMenu} //우클릭
                // getContextMenuItems={getContextMenuItems} //유료
                // suppressContextMenu={false} // 필수        //유료
            />
        </>

    )


}