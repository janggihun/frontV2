import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';

export const MyCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const calendarRef = useRef();

    const valuesMap = {
        '2025-08-01': '(3)',
        '2025-08-02': '(5)',
        '2025-08-05': '(20)',
    };

    const todayStr = new Date().toISOString().slice(0, 10);

    // 마운트 시 오늘 날짜로 이동 (FullCalendar 내부 state 강제 설정)
    useEffect(() => {
        if (calendarRef.current) {
            const api = calendarRef.current.getApi();
            api.updateSize();
            setCurrentDate(api.getDate());
            //해당 날짜 셀
            // const dateCell = document.querySelector(`[data-date="${todayStr}"]`);
        }
    });
    useEffect(()=>{
        const api = calendarRef.current.getApi();
        console.log(calendarRef.current)
        api.gotoDate(new Date());

    },[])

    const formatYearMonth = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        return `${y}-${m}`;
    };

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
                initialDate={new Date()} // 오늘로 시작
                locale={koLocale}
                fixedWeekCount={false}
                height={300}
                selectable={true}
                headerToolbar={false}
                datesSet={(info) => {
                    setCurrentDate(info.start);
                }}
                dayCellContent={(arg) => {
                    const dayNumber = arg.date.getDate();
                    const dateStr = arg.date.toISOString().slice(0, 10);
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
                            <div style={{ fontSize: '0.7rem', color: textColor, marginTop: 2 }}>
                                {value}
                            </div>
                        </div>
                    );
                }}
                dayCellDidMount={(info) => {
                    const dateStr = info.date.toISOString().slice(0, 10);
                    if (valuesMap[dateStr] || dateStr === todayStr) {
                        info.el.style.backgroundColor = '#fff9c4';
                        info.el.style.borderRadius = '6px';
                    }
                }}
            />
        </div>
    );
};
