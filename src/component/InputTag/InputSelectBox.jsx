export const InputSelectBox = ({ label, value, onChange, disabled, list ,changeValue}) => {
    const initialValue =  list?[0].value : '';

    return (
        <div className="flex w-full h-full">
            <label
                className={`text-sm bg-gray-200 w-24 flex items-center justify-center border border-gray-300 `}
            >
                {label}
            </label>
            <select className="flex-1 focus:outline-none border border-gray-300"
                    placeholder={`${label} 입력`}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}


            > class="tb tb_col"
                <option key={"selected"}  value="">{"선택"}</option>
                { list?.map((el, idx)=> {
                    return <option key={idx}  value={el.value}>{el.name}</option>
                })}

            </select>
        </div>
    );
};
