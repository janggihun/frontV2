export const MainTitle = ({title, children }) => {
    return (
        <div className="w-full h-[5%] flex flex-col sm:flex-row justify-start items-center bg-gray-200 rounded-2xl p-2 gap-2">
            <div className="text-xl text-[14px]">{title}</div>
            {children}
        </div>
    );
};