import { useNavigate } from "react-router-dom";

export const Sidebar = () => {

    return (
        <aside className="w-64 bg-gray-100 h-full p-4 shadow-md">
            <ul className="space-y-4 mt-10">
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">작업지시</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">설비현황</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">작업자관리</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">품질검사</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">재고조회</button>
                </li>
            </ul>
        </aside>
    );
};
export const Sidebar_bom = () => {
    const navigate = useNavigate();
    return (
        <aside className="w-64 bg-gray-100 h-full p-4 shadow-md">
            <ul className="space-y-4 mt-10">
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow"   onClick={() => {
                              navigate("/bom/manager")
                            }}>품목관리</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow"
                            onClick={() => {
                              navigate("/bom/register")
                            }}>품목등록
                    </button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">제원...</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">제원...</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">제원....</button>
                </li>
            </ul>
        </aside>
    );
};
export const Sidebar_obtn = () => {

    return (
        <aside className="w-64 bg-gray-100 h-full p-4 shadow-md">
            <ul className="space-y-4 mt-10">
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">수주관리</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">수주등록</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">수주진행현황</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">수주완료현황</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">포장관리</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">포장현황</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">출고관리</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">출고현황</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">출하관리</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">출하현황</button>
                </li>
            </ul>
        </aside>
    );
};

export const Sidebar_dashBoard = () => {

    return (
        <aside className="w-64 bg-gray-100 h-full p-4 shadow-md">
            <ul className="space-y-4 mt-10">
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">대시보드관리</button>
                </li>
                {/* <li><button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow"></button></li>
        <li><button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">제원...</button></li>
        <li><button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">제원...</button></li>
        <li><button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">제원....</button></li> */}
            </ul>
        </aside>
    );
};
export const Sidebar_purchase = () => {

    return (
        <aside className="w-64 bg-gray-100 h-full p-4 shadow-md">
            <ul className="space-y-4 mt-10">
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">발주관리</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">발주등록</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">입고관리</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">입고등록</button>
                </li>
            </ul>
        </aside>
    );
};

export const Sidebar_work = () => {

    return (
        <aside className="w-64 bg-gray-100 h-full p-4 shadow-md">
            <ul className="space-y-4 mt-10">
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">작업지시서 등록</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">생산실적 등록</button>
                </li>
            </ul>
        </aside>
    );
};


export const Sidebar_admin = () => {

    return (
        <aside className="w-64 bg-gray-100 h-full p-4 shadow-md">
            <ul className="space-y-4 mt-10">
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">입력 권한</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow"> 페이지 권한</button>
                </li>

            </ul>
        </aside>
    );
};

export const Sidebar_tax = () => {

    return (
        <aside className="w-64 bg-gray-100 h-full p-4 shadow-md">
            <ul className="space-y-4 mt-10">
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">(매출)세금계산서</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">...</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">(매입)세금계산서</button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 bg-white rounded-r-lg shadow">...</button>
                </li>
            </ul>
        </aside>
    );
};