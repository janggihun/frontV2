export const InputText = ({ label, value, onChange, disabled }) => {
    return (
        <div className="flex w-full h-full">
            <label
                className={`text-sm text-gray-700 w-24 flex items-center justify-center border border-gray-300 `}
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
