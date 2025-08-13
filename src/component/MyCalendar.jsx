import React, {useEffect, useState, useRef} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import {getObtnList} from "../api/restApi.js";
import {formatDateTime} from "../common/common.js";

export const MyCalendar = (props) => {
    const searchMap = props.searchMap;

    const [currentDate, setCurrentDate] = useState(new Date());
    const [obtnList, setObtnList] = useState([]);

    const calendarRef = useRef();
    
    //오늘날짜
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    //해당 날짜 찾기
    const valuesMap = obtnList.reduce((acc, obtn) => {
        const dateStr = obtn.inputDate;

        if (acc[dateStr]) {
            const prevCount = parseInt(acc[dateStr].replace(/[()]/g, '')) || 0;
            acc[dateStr] = `(${prevCount + 1})`;
        } else {
            acc[dateStr] = '(1)';
        }
        return acc;
    }, {});
    //찾은 날짜에 색 넣어주기
    Object.keys(valuesMap).forEach((dateStr) => {
        const dateCell = document.querySelector(`[data-date="${dateStr}"]`);
        if(dateStr === todayStr) {
            return;
        }
        if (dateCell) {
            dateCell.style.backgroundColor = '#fff9c4';  // 전체 날짜 셀 배경색
            dateCell.style.borderRadius = '6px';
        }
    });

    useEffect(() => {
        //오늘날짜
        const api = calendarRef.current.getApi();
        api.gotoDate(new Date());

        //오리지널 데이터
        const getData = async () => {

            const res_obtn = await getObtnList()

            const cleanData = res_obtn.map(item => ({
                // ...item,
                inputDate: item.inputDate ? formatDateTime(item.inputDate) : '',
                updateDate: item.updateDate ? formatDateTime(item.updateDate) : ''
            }));
            setObtnList(cleanData);
        }
        getData()

    }, [])

    const handleDateClick = (arg) => {
        searchMap.startDt = arg.dateStr;
        searchMap.endDt = arg.dateStr;
        props.setSearchMap({...searchMap});
    };

    //달력 월
    const formatYearMonth = (value) => {

        const date = new Date(value);

        const pad = (n) => n.toString().padStart(2, '0');

        const yyyy = date.getFullYear();
        const mm = pad(date.getMonth() + 1);


        return `${yyyy}-${mm}`;
    };

    useEffect(() => {
        if(obtnList.length > 0) {

            const dateCell = document.querySelector(`[data-date="${todayStr}"]`);
            // console.log(dateCell)
            dateCell.click();
        }

    }, [obtnList]);
    return (
        <div className="w-[320px] border p-2">
            <div className="flex items-center justify-center gap-4 select-none h-[30px]">
                <button
                    className="w-[30px] rounded bg-gray-700 text-white"
                    onClick={() => {
                        const api = calendarRef.current.getApi();
                        api.prev();
                        setCurrentDate(api.getDate());
                    }}
                >
                    &lt;
                </button>
                <div className="text-lg font-semibold">{formatYearMonth(currentDate)}</div>
                <button
                    className="w-[30px] rounded bg-gray-700 text-white"
                    onClick={() => {
                        const api = calendarRef.current.getApi();
                        api.next();
                        setCurrentDate(api.getDate());
                    }}
                >
                    &gt;
                </button>
            </div>

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                // initialDate={new Date()} // 오늘로 시작
                locale={koLocale}
                fixedWeekCount={false}
                height={300}
                selectable={true}
                headerToolbar={false}
                dateClick={handleDateClick} //클릭
                datesSet={(info) => {

                    setCurrentDate(new Date());

                }}
                dayCellContent={(arg) => {

                    const dayNumber = arg.date.getDate();
                    //날짜를 데이터 포맷
                    const dateStr = formatDateTime(arg.date);
                    const value = valuesMap[dateStr] || '';
                    const dayOfWeek = arg.date.getDay();

                    let textColor = 'inherit';
                    if (dayOfWeek === 0) textColor = 'red';
                    else if (dayOfWeek === 6) textColor = 'blue';

                    return (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                height: '100%',
                                fontSize: '0.85rem',
                                lineHeight: 1.2,
                                color: textColor,

                            }}
                        >
                            <div>{dayNumber}</div>
                            <div style={{fontSize: '0.7rem', color: textColor, marginTop: 2}}>
                                {value}
                            </div>
                        </div>
                    );
                }}

            />
        </div>
    );
};
