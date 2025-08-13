import {useEffect, useState} from "react";
import {today} from "../../../common/common.js";

export const ObtnSearchBox = (props) => {
    const obtnList = props.obtnList;
    const gridApi = props.gridApi
    const [obtnNm, setObtnNms] = useState();
    const [startDt, setStartDt] = useState();
    const [endDt, setEndDt] = useState();
    // 검색 조건 상태
    const searchMap = {
        obtnNm,
        clientNm: '',
        siteNm: '',
        startDt,
        endDt,
        mony: 0,
        compNm: ''
    };
    const clickSearchBox = () => {
        props.setSearchMap({...searchMap});
    }
    const onchange_obtnNm = (e) => {
        setObtnNms(e.target.value)
    }
    const onchange_startDt = (e)=>{
        //끝날짜가 있는경우 끝날짜보다 클수없음
        setStartDt(e.target.value)
    }
    const onchange_endDt = (e)=>{
        //시작날짜가 있는경우 시작날짜보다 작을수없음

        setEndDt(e.target.value)
    }

    useEffect(()=>{
       
        searchMap.startDt = today();
        searchMap.endDt = today();
        clickSearchBox()

    },[])
    return <>  {/* 검색 조건 영역 */}
        <div style={{
            marginBottom: 10,
            display: 'flex',
            gap: 8,
            flexWrap: 'nowrap',
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
                <span style={{fontWeight: 'bold'}}>수주리스트</span>
                <span style={{marginLeft: 8, color: '#555', fontSize: 13}}>
                    총 {obtnList.length}건
                </span>
            </div>
            <div className="w-[8%]"></div>
            {/* 검색 input들 */}
            <input
                type="text"
                name="obtnNm"
                placeholder="수주번호"
                value={searchMap.obtnNm}
                onChange={onchange_obtnNm}
                style={{width: 140, padding: 6, borderRadius: 4, border: '1px solid #ccc', flexShrink: 0}}
            />
            {/* 필요시 다른 input들도 여기에 추가 */}

            <label style={{whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4}}>
                시작날짜
                <input
                    type="date"
                    name="startDate"
                    value={searchMap.startDate}
                    onChange={onchange_startDt}
                    style={{flex: '1 1 130px', padding: 6, borderRadius: 4, border: '1px solid #ccc'}}
                />
            </label>

            <label style={{whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4}}>
                끝날짜
                <input
                    type="date"
                    name="endDate"
                    value={searchMap.endDate}
                    onChange={onchange_endDt}
                    style={{flex: '1 1 130px', padding: 6, borderRadius: 4, border: '1px solid #ccc'}}
                />
            </label>

            {/* 버튼을 오른쪽 끝으로 밀기 위한 빈 flex-grow 요소 */}
            <div style={{flexGrow: 1}}/>

            <button
                onClick={() => clickSearchBox()}
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

                    if (gridApi) {
                        console.log(gridApi)
                        const selectedRows = gridApi.getSelectedRows();
                        console.log(selectedRows)
                        if (selectedRows.length === 0) {
                            alert("선택된 행이 없습니다.");
                            return;
                        }
                        //전체 내보내기
                        // gridApi.api.exportDataAsCsv({
                        //     fileName: '수주리스트.csv', // 저장될 파일명
                        //     columnSeparator: ',',      // 기본은 쉼표 (변경 가능)
                        // });

                        gridApi.exportDataAsCsv({
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
    </>


}