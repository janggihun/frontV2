
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
        field: 'No',
        width: 110,
        headerName: 'No',
        cellStyle: { textAlign: 'center' },

        cellRenderer: (params) => {
            return params.value;
        },
    },
    {
        field: 'obtnNm',
        width: 110,
        headerName: '수주번호',
        cellStyle: { textAlign: 'center' },

    },
    {
        field: 'mony',
        width: 110,
        headerName: '수주금액',
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
        field: 'inputId',
        width: 100,
        headerName: '작성자',
        cellStyle: { textAlign: 'center' },

    },
    {
        field: 'inputDate',
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
        field: 'updateId',
        width: 100,
        headerName: '수정자',
        cellStyle: { textAlign: 'center' },

    },
    {
        field: 'updateDate',
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