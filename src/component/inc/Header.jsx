
import { Status } from "../../enum/enum";
import { getLogoutAxios } from "../../api/restApi";
import { headerList } from "../Common.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navivate = useNavigate()
  const User = useSelector((state) => {
    return state.User.value;
  });

  //로그아웃
  const logout = async () => {

    const res = await getLogoutAxios();

    if (res.status === Status.SUCCESS) {

      window.location.reload();
    }
  };

  const currentPath = window.location.pathname;

  return (
      <header className="w-full h-[50px] bg-gray-800 text-white flex items-center px-6 shadow justify-between z-30">
      {/* 가운데 정렬용 nav */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
        {headerList.map((el, index) => {
          const isActive = currentPath.startsWith(el.url);

          return (
            <button
              key={index}
              onClick={() => navivate(el.clickUrl)}
              className={`px-2 py-1 rounded transition-colors ${isActive ? "text-green-400 font-bold" : "text-white"
                } hover:text-green-300`}
            >
              {el.label}
            </button>
          );
        })}
      </nav>

      {/* 오른쪽 유저 영역 */}
      <div className="flex items-center gap-4 ml-auto">
        <span className="text-sm text-[white]">👤 {User}</span>
        <button
          onClick={() => { logout(); }}
          className="text-sm bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    </header>

  );
};
