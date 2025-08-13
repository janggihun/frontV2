import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";

export const ObtnTable = () => {
    const data = [
        { name: "홍길동", dept: "영업", amount: 1000 },
        { name: "이몽룡", dept: "영업", amount: 2000 },
        { name: "성춘향", dept: "인사", amount: 1500 },
        { name: "변학도", dept: "인사", amount: 2500 },
        { name: "임꺽정", dept: "개발", amount: 3000 },
    ];

    const columns = [
        { title: "이름", field: "name", width: 150 },
        {
            title: "부서",
            field: "dept",
            width: 120,
            formatter: (cell) => {
                const rowData = cell.getRow().getData();
                if (rowData.isSubtotal) return ""; // 소계는 부서 비우기
                return rowData.dept;
            },
        },
        {
            title: "금액",
            field: "amount",
            width: 100,
            hozAlign: "right",
            formatter: (cell) => {
                const rowData = cell.getRow().getData();
                return `₩${rowData.amount.toLocaleString()}`;
            },
        },
    ];

    // 부서별 그룹화 + 소계
    const groupMap = data.reduce((map, row) => {
        if (!map[row.dept]) map[row.dept] = [];
        map[row.dept].push(row);
        return map;
    }, {});

    let processedData = [];
    Object.keys(groupMap).forEach((dept) => {
        const rows = groupMap[dept];
        processedData = processedData.concat(rows);
        const subtotal = rows.reduce((sum, r) => sum + r.amount, 0);
        processedData.push({
            name: "소계",
            dept: "", // 소계에서는 부서 비움
            amount: subtotal,
            isSubtotal: true,
        });
    });

    const totalSum = data.reduce((sum, row) => sum + row.amount, 0);

    // footer DOM 요소 생성
    const footerDiv = document.createElement("div");
    footerDiv.style.display = "flex";
    footerDiv.style.backgroundColor = "#f5f5dc";
    footerDiv.style.fontWeight = "bold";
    footerDiv.style.padding = "5px";

    const emptyName = document.createElement("div");
    emptyName.style.width = "150px"; // 이름 컬럼 폭

    const emptyDept = document.createElement("div");
    emptyDept.style.width = "120px"; // 부서 컬럼 폭

    const amountDiv = document.createElement("div");
    amountDiv.style.width = "100px"; // 금액 컬럼 폭
    amountDiv.style.textAlign = "right";
    amountDiv.textContent = `₩${totalSum.toLocaleString()}`;

    footerDiv.appendChild(emptyName);
    footerDiv.appendChild(emptyDept);
    footerDiv.appendChild(amountDiv);

    return (
        <>
            <h2>자동 소계 + 전체 합계</h2>
            <ReactTabulator
                style={{ width: "800px", height: "300px" }}
                data={processedData}
                columns={columns}
                options={{
                    layout: "fitDataTable",
                    rowFormatter: (row) => {
                        const data = row.getData();
                        if (data.isSubtotal) {
                            row.getElement().style.backgroundColor = "#cceeff"; // 하늘색
                            row.getElement().style.fontWeight = "bold";
                            row.getElement().style.textAlign = "right"; // 금액 정렬
                        }
                    },
                    footerElement: footerDiv,
                }}
            />
        </>
    );
};
