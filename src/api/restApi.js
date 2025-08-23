import {Status} from "../enum/enum";
import axios from "./axiosConfig";
import {closeLoading, openLoading} from "../store/LoadingSlice.jsx";


//디스페치
let dispatch = null;

export const getDispatch = (value)=>{
  dispatch = value;
}
const base = ""

/*
* get axios
* 검색시
*/
export const getAxios = async (url, map) => {
  dispatch(openLoading())
  try {
    const res = await axios.get(base + url,  {
      params : map,
      withCredentials: true
    });
    return res.data;
  } catch (error) {
    // console.log(error)
    alert(error.response.data.data)

  }finally {
    dispatch(closeLoading())
  }
}

export const getMeAxios = async () => {
  dispatch(openLoading())
  const url = "/api/v1/user/me";
  try {
    const res = await axios.get(base + url, {
      withCredentials: true
    });
    return res.data;
  } catch (error) {
    // console.log(error)
    alert(error.response.data.data)


  }finally {
    dispatch(closeLoading())
  }
}

export const getLogoutAxios = async () => {
  dispatch(openLoading())
  const url = "/api/v1/user/logout";
  try {
    const res = await axios.get(base + url, {
      withCredentials: true
    });
    return res.data;
  } catch (error) {
    // console.log(error)
    alert(error.response.data.data)

  }finally {
    dispatch(closeLoading())
  }
}
/*
* post axios
* 데이터 저장시
*/
export const postAxios = async (url, map) => {
  dispatch(openLoading())
  try {
    const res = await axios.post(base + url, map, {
      withCredentials: true
    });

    return res.data
  } catch (error) {

    alert(error.response.data.data)

  }finally {
    dispatch(closeLoading())
  }


}
/*
* patch axios 
* 수정시
*/
export const patchAxios = async (url, map) => {
  dispatch(openLoading())
  try {
    const res = await axios.patch(base + url, map, {
      withCredentials: true
    });
    return res.data
  } catch (error) {
    alert(error.response.data.data)

  }finally {
    dispatch(closeLoading())
  }

}

/*
* delete axios
* 삭제시
*/
export const deleteAxios = async (url, map) => {
  dispatch(openLoading())
  try {
    const res = await axios.delete(base + url, map, {
      withCredentials: true
    });
    return res.data
  } catch (error) {
    alert(error.response.data.data)

  }finally {
    dispatch(closeLoading())
  }

}

/**
 * 
 * resApi 시 작
 */

export const getCompRead = async () => {

  const url = "/api/comp/read";
  const res = await getAxios(url);

  return res.data
}

export const getObtnList = async (searchMap) => {

};