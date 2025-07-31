import { useState } from "react"
import { postAxios } from "../api/restApi";
import { Status } from "../enum/enum";
import { useNavigate } from "react-router-dom";
import { moveUrl } from "../Common";

export const Login = () => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();

  const changeId = (e) => setUserId(e.target.value);
  const changePw = (e) => setUserPw(e.target.value);

  const click_loginBtn = async () => {
    const userMap = { userId, userPw };
    const url = "/api/v1/user/login";
    const res = await postAxios(url, userMap);
    // console.log(res);
    if (res.status === Status.SUCCESS) {

       localStorage.setItem("jwt", res.data); // 또는 sessionStorage.setItem

      navigate("/dashBoard/manager");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f2f2f2] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* 회사 이름 */}
        <h1 className="text-center text-2xl font-bold text-gray-800">삼원 MES 로그인</h1>

        {/* 입력 필드 그룹 */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            onChange={changeId}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#03C75A] focus:border-[#03C75A] placeholder-gray-400"
          />

          <input
            type="password"
            placeholder="비밀번호"
            onChange={changePw}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#03C75A] focus:border-[#03C75A] placeholder-gray-400"
          />
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={click_loginBtn}
          className="w-full py-3 rounded-lg bg-[#03C75A] text-sm font-bold text-white hover:bg-[#02b150] transition"
        >
          로그인
        </button>
      </div>
    </div>
  );
};
