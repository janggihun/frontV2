/**
 * 
 * url 단위로 사용하는 모든 map의 형태가 들어가있음 
 * 
 */

// /obtn/register
export const createObtnRegisterMap = () => {
    const map = {}

    const fields = [
        { key: "obtnNm", label: "수주번호" },
        { key: "compCd", label: "거래처" },
        { key: "plceNm", label: "현장명" },
        { key: "obtnMk", label: "비고" },
        { key: "item5", label: "항목5" },
        { key: "item6", label: "항목6" },
        { key: "item7", label: "항목7" },
        { key: "item8", label: "항목8" },
        { key: "item9", label: "항목9" },
        { key: "item10", label: "항목10" },
        { key: "item11", label: "항목11" },
        { key: "item12", label: "항목12" },
    ];
    map.fields = fields;
    map.saveMap = {};
    return map;
}