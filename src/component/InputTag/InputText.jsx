export const InputText = ({ label, value, onChange, disabled ,changeValue}) => {
    return (
        <div className="flex w-full h-full">
            <label
                className={`text-sm  w-24 flex items-center justify-center border border-gray-300  bg-gray-200 bold`}
            >
                {label}
            </label>
            <input
                className="flex-1 focus:outline-none border border-gray-300"
                placeholder={`${label} 입력`}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};
