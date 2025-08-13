import {useEffect, useRef, useState} from 'react';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import {getObtnList} from "../api/restApi.js";
import {formatDateTime} from "../common/common.js";

export const MyTable = () => {
    const tableRef = useRef();

    useEffect(() => {
        const table = new Tabulator(tableRef.current, {
            data: [
                {name: '홍길동', age: 30},
                {name: '김영희', age: 25}
            ],
            columns: [
                {title: '이름', field: 'name', sorter: 'string'},
                {title: '나이', field: 'age', sorter: 'number', bottomCalc: 'avg'}
            ],
            layout: 'fitColumns',
        });

        return () => table.destroy();
    }, []);

    return <div ref={tableRef}/>;
}

/*
* 수주 테이블
* */
export const ObtnTable = () => {
    const [originList, setOriginList] = useState()
    const tableRef = useRef(null);          // DOM 컨테이너
    const tableInstRef = useRef(null);      // Tabulator 인스턴스


    // 1) 테이블은 한 번만 생성
    useEffect(() => {
        if (!tableRef.current) return;

        tableInstRef.current = new Tabulator(tableRef.current, {
            data: [],                           // 초기엔 비워두기
            layout: 'fitColumns',
            groupBy: "compNm", // 거래처별 그룹핑
            groupHeader: function(value, count, data, group) {
                // value: 그룹 값(거래처명), count: 행 개수
                // 여기서 그룹 소계 계산 가능
                const sum = data.reduce((acc, row) => acc + (row.mony || 0), 0);
                return `${value} - 건수: ${count}건 / 소계: ${sum.toLocaleString()}원`;
            },



            columns: [
                { title: 'No', field: 'No', width: 60 },
                { title: '수주번호', field: 'obtnNm', width: 140, sorter: 'string' },
                { title: '수주금액', field: 'mony', width: 120, sorter: 'number', bottomCalc: 'sum' },
                { title: '거래처', field: 'compNm', width: 160, sorter: 'string' },
                { title: '주소', field: 'compAdr', width: 100, sorter: 'string' },
                { title: '작성자', field: 'inputId', width: 120, sorter: 'string' },
                { title: '작성 날짜', field: 'inputDate', width: 160, sorter: 'string' }
            ]
        });

        return () => {
            tableInstRef.current?.destroy();
            tableInstRef.current = null;
        };
    }, []);
    // 2) 데이터 가져오기
    useEffect(() => {
        (async () => {
            const res = await getObtnList();
            const clean = res.map((item, idx) => ({
                ...item,
                No: idx + 1,
                testView: '',
                inputDate: item.inputDate ? formatDateTime(item.inputDate) : '',
                updateDate: item.updateDate ? formatDateTime(item.updateDate) : ''
            }));
            setOriginList(clean);
        })();
    }, []);

    // 3) originList 변경 시 그리드에 반영
    useEffect(() => {
        if (!originList || !tableInstRef.current) return;

        // 기존 데이터 전부 교체 (페이징/필터 상태 유지)
        tableInstRef.current.replaceData(originList).catch(() => {
            // replaceData가 실패할 경우 setData로 폴백
            tableInstRef.current?.setData(originList);
        });
    }, [originList]);
    return <div ref={tableRef} style={{ width: '1000px' }}/>;
}
