import {MainTitle} from "../../component/MainTitle.jsx";
import Button from "@mui/material/Button";
import {useEffect, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {getRowStyle} from "../../common/common.js";
import {getAxios} from "../../api/restApi.js";
import {Status} from "../../enum/enum.js";
import {useNavigate} from "react-router-dom";

export const CompManager = () => {
    const navigate = useNavigate();
    const gridRef = useRef(null);
    const [itemList, setItemList] = useState([]);
    const columns = [
        // {field: 'id', headerName: '', checkboxSelection: true, width: 70, headerCheckboxSelection: true},
        {field: 'compNm', headerName: '회사이름', width: 150, cellStyle: {textAlign: 'center'}},
        {field: 'compAdr', headerName: '주소', width: 250, cellStyle: {textAlign: 'center'}},
        {field: 'compCd', headerName: '사업자등록번호', width: 150,  cellStyle: {textAlign: 'center'}}, // Footer 합계 가능
        // {field: 'itemMony', headerName: 'Age', width: 90, aggFunc: 'sum'}, // Footer 합계 가능

    ];


    const pinnedBottomRowData = [
        {
            id: "합계",
            age: itemList.reduce((sum, r) => sum + r.age, 0), // 합계 계산
        },
    ];

    const clickCheckInfo = () => {
        const selected = gridRef.current?.api?.getSelectedRows();

        console.log('선택된 데이터:', selected);

    }
    const onRowClicked = (event) => {
        const node = event.node;
        // 현재 선택 상태 반전
        node.setSelected(!node.isSelected());
    };
    useEffect(() => {
        const getData = async () => {

            const url = "/api/comp/read"

            const res = await getAxios(url, null)

            if (res.status === Status.SUCCESS) {
                setItemList(res.data);
            }

        }
        getData()
    }, []);
    return (
        <>
            <MainTitle title={"* 거래처 관리"}/>
            <Button variant="contained" onClick={clickCheckInfo} sx={{mt: 1}}>
                선택된 데이터 확인
            </Button>
            <div className="p-1 w-[100%] h-[50px]  flex justify-end">
                <Button variant="contained" onClick={()=>{navigate("/comp/register")}}>거래처등록</Button>
            </div>
            <div className="ag-theme-alpine" style={{height: '300px', width: '100%'}}>
                <AgGridReact
                    ref={gridRef}
                    rowData={itemList}
                    columnDefs={columns}
                    rowSelection="single"
                    onRowClicked={onRowClicked}
                    enableCellTextSelection={true}
                    suppressRowClickSelection={true} // 클릭과 체크박스 분리
                    animateRows={false}
                    // pinnedBottomRowData={pinnedBottomRowData} // 하단 고정
                    getRowStyle={getRowStyle}
                />
            </div>
        </>
    )
}