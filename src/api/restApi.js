
import { formatDateTime } from "../common/common";
import { Status } from "../enum/enum";
import axios from "./axiosConfig"; // 토큰 가져가서 확인할수 있게함


const base = ""

/*
* get axios
* 검색시
*/
export const getAxios = async (url, map) => {

  try {
    const res = await axios.get(base + url, map, {
      withCredentials: true
    });
    return res.data;
  } catch (error) {
    // console.log(error)
    alert(error.response.data.data)
  }
}

export const getMeAxios = async () => {

  const url = "/api/v1/user/me";
  try {
    const res = await axios.get(base + url, {
      withCredentials: true
    });
    return res.data;
  } catch (error) {
    // console.log(error)
    alert(error.response.data.data)
  }
}

export const getLogoutAxios = async () => {

  const url = "/api/v1/user/logout";
  try {
    const res = await axios.get(base + url, {
      withCredentials: true
    });
    return res.data;
  } catch (error) {
    // console.log(error)
    alert(error.response.data.data)
  }
}
/*
* post axios
* 데이터 저장시
*/
export const postAxios = async (url, map) => {
  try {
    const res = await axios.post(base + url, map, {
      withCredentials: true
    });
    return res.data
  } catch (error) {
    alert(error.response.data.data)
  }


}
/*
* patch axios 
* 수정시
*/
export const patchAxios = async (url, map) => {

  try {
    const res = await axios.patch(base + url, map, {
      withCredentials: true
    });
    return res.data
  } catch (error) {
    alert(error.response.data.data)
  }

}

/*
* delete axios
* 삭제시
*/
export const deleteAxios = async (url, map) => {

  try {
    const res = await axios.delete(base + url, map, {
      withCredentials: true
    });
    return res.data
  } catch (error) {
    alert(error.response.data.data)
  }

}

/**
 * 
 * resApi 시 작
 */

export const getCompRead = async () => {

  const url = "/api/v1/comp/read";
  const res = await getAxios(url);

  return res.data
}

export const getObtnList = async () => {
  const url = "/api/v1/obtn/read";

  const res = await getAxios(url);
  if (res.status === Status.SUCCESS) {
    return res.data;
  }
};