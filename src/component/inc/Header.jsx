import { useEffect, useState } from "react";
import { Status } from "../../enum/enum";
import { getAxios } from "../../api/restApi";
import { useNavigate } from "react-router-dom";
import { headerList, moveUrl } from "../../Common";

export const Header = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();

  //로그아웃
  const logout = async () => {
    const url = "/api/v1/user/logout";
    const res = await getAxios(url);

    if (res.status === Status.SUCCESS) {
      localStorage.removeItem("jwt");
      navigate("/");
    }
  };

  useEffect(() => {
    const getId = async () => {

      //userId , 권한 확인
      const url = "/api/v1/user/Authorization";

      try {
        const res = await getAxios(url);

        if (res.status === Status.SUCCESS && res.data) {
          setUserId(res.data);
          return;
        }
        navigate("/");
      } catch (error) {
        navigate("/");
      }
    };
    getId();
  }, []);

  const currentPath = window.location.pathname;

  return (
    <header className="w-full h-16 bg-gray-800 text-white flex items-center px-6 shadow justify-between relative z-30">
      {/* 가운데 정렬용 nav */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
        {headerList.map((el, index) => {
          const isActive = currentPath.startsWith(el.url);
          return (
            <button
              key={index}
              onClick={() => window.location.href = (el.clickUrl)}
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
        <span className="text-sm text-[white]">👤 {userId}</span>
        <button
          onClick={logout}
          className="text-sm bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
};
