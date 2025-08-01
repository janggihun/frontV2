import {useState} from "react";
import { postAxios} from "../../../api/restApi.js";
import {Status} from "../../../enum/enum.js";
import { useNavigate} from "react-router-dom";

export const ObtnRegisterHead = () => {
    const navigate = useNavigate();
    const [saveMap, setSaveMap] = useState({});

    const fields = [
        {key: "obtnNm", label: "수주번호"},
        {key: "compCd", label: "거래처"},
        {key: "plceNm", label: "현장명"},
        {key: "obtnMk", label: "비고"},
        {key: "item5", label: "항목5"},
        {key: "item6", label: "항목6"},
        {key: "item7", label: "항목7"},
        {key: "item8", label: "항목8"},
        {key: "item9", label: "항목9"},
        {key: "item10", label: "항목10"},
        {key: "item11", label: "항목11"},
        {key: "item12", label: "항목12"},
    ];

    /*
     * input데이터가 바뀌었을때 이벤트
     */
    const handleChange = (key, e) => {
        setSaveMap((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    /*
     * 저장 이벤트
     */
    const handleSubmit =async () => {
        // 예시: 저장 로직 (API 호출 등)

        const url = "/api/v1/obtn/save"
        const res = await postAxios(url , saveMap);

        if(res.status === Status.SUCCESS){
            alert(res.data);
            return navigate("/obtn/manager")
        }

    };

    return (
        <div className="w-full bg-white rounded-xl shadow-md p-4">
            <div className="grid grid-cols-4 gap-4">
                {fields.map(({key, label}, idx) => (
                    <div key={idx} className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-600">{label}</label>
                        <input
                            className={`w-full border rounded-md px-2 py-1 focus:outline-none transition
    ${
                                key === "obtnNm"
                                    ? "bg-gray-100 cursor-not-allowed border-gray-300"
                                    : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                            }
  `}
                            placeholder={key === "obtnNm" ? "" : `${label} 입력`}
                            value={saveMap[key] || ""}
                            onChange={(e) => handleChange(key, e)}
                            disabled={key === "obtnNm"}
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                저장하기
            </button>

            {/* 디버그용: 현재 상태 확인 */}
            <pre className="mt-4">{JSON.stringify(saveMap, null, 2)}</pre>
        </div>
    );
};
