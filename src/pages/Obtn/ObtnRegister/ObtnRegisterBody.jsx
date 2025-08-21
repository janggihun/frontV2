import {Button} from "@mui/material";

export const ObtnRegisterBody = () => {


  return (
    <div className="w-full bg-white rounded-xl shadow-md p-0 border border-gray-300 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-gray-200">

      </div>

      {/* 저장 버튼: 오른쪽 정렬 */}
      <div className="p-4 flex justify-end bg-white border-t border-gray-200">
          <Button variant="contained">  저장하기</Button>

      </div>


    </div>
  );
}


