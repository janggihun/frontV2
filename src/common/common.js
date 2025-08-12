export const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);

    const pad = (n) => n.toString().padStart(2, '0');

    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    const ss = pad(date.getSeconds());

    return `${yyyy}-${mm}-${dd}`;
    // return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}


// 정렬
export const processDataWithSubtotals = (data, category, sortOrder) => {
    if (!category || !data || data.length === 0) return data;

    const sortedData = [...data].sort((a, b) => {
        const valA = a[category];
        const valB = b[category];

        // 값이 숫자면 숫자 정렬, 아니면 문자열 정렬
        const isNumber = !isNaN(Number(valA)) && !isNaN(Number(valB));

        if (isNumber) {
            const numA = Number(valA) || 0;
            const numB = Number(valB) || 0;
            return sortOrder === 'asc' ? numA - numB : numB - numA;
        } else {
            return sortOrder === 'asc'
                ? String(valA).localeCompare(String(valB))
                : String(valB).localeCompare(String(valA));
        }
    });
    //넘버링 시작
    sortedData.forEach((el,i)=>{
        el.No = i+1;
    })
    const isCategoryNumeric = !isNaN(Number(sortedData[0][category]));

    // ✅ 숫자 기준으로 정렬한 경우 → 소계 없이 전체 합계만
    if (isCategoryNumeric) {
        const totalMony = sortedData.reduce((acc, cur) => acc + (Number(cur.mony) || 0), 0);
        return [
            ...sortedData.map((item, idx) => ({
                ...item,
                testView: idx + 1
            })),
            {
                [category]: '',
                No: '전체 합계',
                mony: totalMony,
                isTotal: true
            }
        ];
    }

    // ✅ 문자열 기준으로 정렬한 경우 → 소계 + 전체 합계
    const result = [];
    let currentGroup = '';
    let subtotal = 0;
    let i = 1;

    sortedData.forEach((item, index) => {
        const groupValue = item[category] || '';

        if (groupValue !== currentGroup) {
            if (currentGroup !== '') {
                i = 1;
                result.push({
                    [category]: '',
                    No: '소계',
                    mony: subtotal,
                    isSubtotal: true,
                    inputDate: null,
                    updateDate: null
                });
                subtotal = 0;
            }
            currentGroup = groupValue;
        }

        item.testView = i;
        result.push(item);
        subtotal += Number(item.mony) || 0;

        // 마지막 항목이면 소계 추가
        if (index === sortedData.length - 1) {
            result.push({
                [category]: '',
                No: '소계',
                mony: subtotal,
                isSubtotal: true,
                inputDate: null,
                updateDate: null
            });
        }

        i++;
    });

    const totalMony = sortedData.reduce((acc, cur) => acc + (Number(cur.mony) || 0), 0);
    result.push({
        [category]: '',
        No: '전체 합계',
        mony: totalMony,
        isTotal: true
    });

    return result;
};
