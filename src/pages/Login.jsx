import { useEffect, useState } from "react"
import { postAxios } from "../api/restApi";
import { Status } from "../enum/enum";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initUserData } from "../store/UserSlice.Jsx";

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const User = useSelector((state) => {
    return state.User.value;
  });

  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();

  const changeId = (e) => setUserId(e.target.value);
  const changePw = (e) => setUserPw(e.target.value);

  const click_loginBtn = async () => {
    const userMap = { userId, userPw };
    const url = "/api/v1/user/login";
    const res = await postAxios(url, userMap, {
      withCredentials: true // 세션 쿠키 전달 필수
    });
    // alert(res.data); // 로그인 성공
    // console.log(res);
    if (res.status === Status.SUCCESS) {

      dispatch(initUserData(userId))

      navigate("/dashBoard/manager");
    }
  };

  useEffect(() => {

    if (User) {
      navigate("/dashBoard/manager");
    }

  }, [User])
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
