
export const ObtnList_columnDefs = [
    {

        headerCheckboxSelection: true,
        checkboxSelection: (params) => {
            // 소계 또는 합계 행은 체크박스 비활성화

            return !(params.data?.isSubtotal);
        },
        width: 40,
        pinned: 'left',
    },
    {
        field: 'obtnNm',
        width: 110,
        headerName: '수주번호',
        cellStyle: { textAlign: 'center' },

    },
    // {
    //     field: 'No',
    //     width: 110,
    //     headerName: 'No',
    //     cellStyle: { textAlign: 'center' },
    //
    //     cellRenderer: (params) => {
    //         return params.value;
    //     },
    // },
    {
        field: 'remainDt',
        width: 110,
        headerName: '남은기일',
        cellStyle: { textAlign: 'center' },

        cellRenderer: (params) => {
            return params.value;
        },
    },
    {
        field: 'status',
        width: 110,
        headerName: '상태',
        cellStyle: { textAlign: 'center' },

        cellRenderer: (params) => {
            return params.value;
        },
    },

    {
        field: 'stx',
        width: 110,
        headerName: '부가세',
        cellStyle: { textAlign: 'right' },

        valueFormatter: params => {
            if (params.value == null) return '';
            return params.value.toLocaleString();  // 1000000 → "1,000,000"
        },

    },
    {
        field: 'compNm',
        width: 130,
        headerName: '거래처',
        cellStyle: { textAlign: 'center' },


    },
    {
        field: 'compAdr',
        width: 130,
        headerName: '주소',
        cellStyle: { textAlign: 'center' },

    },
    {
        field: 'rgstNm',
        width: 100,
        headerName: '작성자',
        cellStyle: { textAlign: 'center' },

    },
    {
        field: 'rgstDt',
        width: 200,
        headerName: '작성 날짜',
        cellStyle: { textAlign: 'center' },

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
            if (!params.value) return '';
            return params.value
            //   const date = new Date(params.value);
            // return date.toLocaleString();
        }
    },
    {
        field: 'updtNm',
        width: 100,
        headerName: '수정자',
        cellStyle: { textAlign: 'center' },

    },
    {
        field: 'updtDt',
        width: 200,
        headerName: '수정 날짜',
        cellStyle: { textAlign: 'center' },

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
            if (!params.value) return '';
            return params.value

        }
    },
    {
        field: 'obtnMk',
        width: 100,
        headerName: '비고',
        cellStyle: { textAlign: 'center' },

    },
]


export const ObtnDtl_col = [
    {

        headerCheckboxSelection: true,
        checkboxSelection: (params) => {
            // 소계 또는 합계 행은 체크박스 비활성화

            return !(params.data?.isSubtotal);
        },
        width: 40,
        pinned: 'left',
    },
    {
        field: 'status',
        width: 110,
        headerName: '상태',
        cellStyle: { textAlign: 'center' },

        cellRenderer: (params) => {
            return params.value;
        },
    },
    {
        field: 'sortIndex',
        width: 110,
        headerName: '순서',
        cellStyle: { textAlign: 'center' },

    },
    // {
    //     field: 'No',
    //     width: 110,
    //     headerName: 'No',
    //     cellStyle: { textAlign: 'center' },
    //
    //     cellRenderer: (params) => {
    //         return params.value;
    //     },
    // },
    {
        field: 'obtnAmt',
        width: 110,
        headerName: '수량',
        cellStyle: { textAlign: 'center' }
    },


    {
        field: 'obtnMony',
        width: 110,
        headerName: '수주금액',
        cellStyle: { textAlign: 'right' },

        valueFormatter: params => {
            if (params.value == null) return '';
            return params.value.toLocaleString();  // 1000000 → "1,000,000"
        },

    },
    {
        field: 'itemHdr.itemCd',
        width: 130,
        headerName: '품목코드',
        cellStyle: { textAlign: 'center' },


    },
    {
        field: 'itemHdr.itemNm',
        width: 130,
        headerName: '품목명',
        cellStyle: { textAlign: 'center' },

    },
    {
        field: 'rgstNm',
        width: 100,
        headerName: '작성자',
        cellStyle: { textAlign: 'center' },

    },
    {
        field: 'rgstDt',
        width: 200,
        headerName: '작성 날짜',
        cellStyle: { textAlign: 'center' },

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
            if (!params.value) return '';
            return params.value
            //   const date = new Date(params.value);
            // return date.toLocaleString();
        }
    },
    {
        field: 'updtNm',
        width: 100,
        headerName: '수정자',
        cellStyle: { textAlign: 'center' },

    },
    {
        field: 'updtDt',
        width: 200,
        headerName: '수정 날짜',
        cellStyle: { textAlign: 'center' },

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
            if (!params.value) return '';
            return params.value

        }
    },
    {
        field: 'obtnMk',
        width: 100,
        headerName: '비고',
        cellStyle: { textAlign: 'center' },

    },
]