import {
    Sidebar_admin,
    Sidebar_bom,
    Sidebar_dashBoard,
    Sidebar_obtn,
    Sidebar_purchase,
    Sidebar_tax,
    Sidebar_work
} from "./inc/Sidebar.jsx";


export const headerList = [
    { url: "/dashBoard", label: "대쉬보드", clickUrl: "/dashBoard/manager" , comp : <Sidebar_dashBoard/>},
    { url: "/bom", label: "품목관리", clickUrl: "/bom/manager" ,comp : <Sidebar_bom/>},
    { url: "/obtn", label: "영업관리", clickUrl: "/obtn/manager" ,comp : <Sidebar_obtn/>},
    { url: "/work", label: "작업지시", clickUrl: "/work/manager", comp : <Sidebar_work/> },
    { url: "/purchase", label: "구매자재", clickUrl: "/purchase/manager", comp : <Sidebar_purchase/> },
    { url: "/tax", label: "세금계산서", clickUrl: "/tax/manager" , comp : <Sidebar_tax/>},

    { url: "/admin", label: "홈페이지관리", clickUrl: "/admin/manager" , comp : <Sidebar_admin/>},
  ];

