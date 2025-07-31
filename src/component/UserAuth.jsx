import { useNavigate } from "react-router-dom";
import { getMeAxios } from "../api/restApi";
import { Status } from "../enum/enum";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initUserData } from "../store/UserSlice.Jsx";
/*
* 유저 확인 함수
*/
export const UserAuth = ()=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getId = async () => {
  
    //유저를 확인
    const res = await getMeAxios();
    if (res.status === Status.SUCCESS) {

      dispatch(initUserData(res.data))
      return;
    }
    //실패시 로그인화면
    navigate("/") ;
    
  };
  useEffect(()=>{ 
     getId();
    },[])

}