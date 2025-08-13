import {useSelector} from "react-redux";


export const LoadingComponent = ()=>{
    const isLoading = useSelector((state) => state.Loading.value);

    if (!isLoading) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
            <div className="w-[100px] h-[100px]">
                <img className="w-full h-full object-contain" src="/Loading/loading2.gif" alt="로딩중" />
            </div>
        </div>
    );

}