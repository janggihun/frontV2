import {MainTitle} from "../../../component/MainTitle.jsx";
import {ObtnList} from "./ObtnList.jsx";
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import {ObtnTable} from "../../../component/TableList.jsx";

export const ObtnManager = () => {


    return (

        <>
            <MainTitle title={"* 수주관리"}/>
            <div className="flex h-[350px] w-full">
                <ObtnList/>
            </div>
            <div className="h-[350px]  w-full">
                <ObtnTable/>
            </div>

        </>

    )
}