
  export const headerList = [
    { url: "/bom", label: "제원관리", clickUrl: "/bom/manager" },
    { url: "/obtn", label: "영업관리", clickUrl: "/obtn/manager" },
    { url: "/work", label: "작업지시", clickUrl: "/work/manager" },
    { url: "/purchase", label: "구매자재", clickUrl: "/purchase/manager" },
    { url: "/tax", label: "세금계산서", clickUrl: "/tax/manager" },
    { url: "/dashboard", label: "대쉬보드", clickUrl: "/dashboard/manager" },
    { url: "/admin", label: "홈페이지관리", clickUrl: "/admin/manager" },
  ];



export const moveUrl = (url)=>{

    window.location.href = url
}