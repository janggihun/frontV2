export const SubTitle = ({ title, children }) => {
    return (
        <>
            <div className="w-[8%] h-[5%] flex flex-col sm:flex-row justify-start items-center bg-gray-200 rounded-2xl p-2 gap-2">
                <div className="text-xl text-[14px]">{title}</div>
                {children}
            </div>
            <div className="w-[100%] h-[10px]"></div>
        </>
    );
};