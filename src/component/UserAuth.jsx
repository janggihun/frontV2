import {Navigate, Outlet} from "react-router-dom";
import { getMeAxios } from "../api/restApi";
import { Status } from "../enum/enum";
import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { initUserData } from "../store/UserSlice.Jsx";
/*
* 유저 확인 함수
*/
export const UserAuth = ()=>{
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(null); // null = 체크 중, true/false = 완료

  useEffect(() => {
    getMeAxios()
        .then(res => {
          if (res.status === Status.SUCCESS) {
            dispatch(initUserData(res.data));
            setIsAuth(true);
          } else {
            setIsAuth(false);
          }
        })
        .catch(() => setIsAuth(false));
  }, [dispatch]);

  // 아직 인증 결과가 없으면 아무것도 안 보여줌 (로딩 없이 빈 화면)
  if (isAuth === null) return null;

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}