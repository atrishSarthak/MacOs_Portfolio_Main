import React, { useMemo } from 'react';

const HeatmapGrid = ({ submissionCalendar }) => {
    const calendarData = useMemo(() => {
        // Parse submissionCalendar if it's a string
        let calendarObj = {};
        if (submissionCalendar) {
            calendarObj = typeof submissionCalendar === 'string'
                ? JSON.parse(submissionCalendar)
                : submissionCalendar;
        }

        const calendarMap = new Map();
        Object.entries(calendarObj).forEach(([timestamp, count]) => {
            // LeetCode timestamps are in seconds
            const date = new Date(parseInt(timestamp) * 1000);
            const key = date.toISOString().split('T')[0];
            calendarMap.set(key, count);
        });

        const today = new Date();
        const fixedStart = new Date('2025-05-01'); // Fixed start date as per requirement

        // Align grid start to the Sunday on or before May 1, 2025
        const start = new Date(fixedStart);
        const dayOfWeek = start.getDay(); // 0 = Sunday
        start.setDate(start.getDate() - dayOfWeek);

        let d = new Date(start);
        const weeks = [];

        // Loop until we cover past today
        while (d <= today || d.toDateString() === today.toDateString()) {
            const weekData = [];
            for (let day = 0; day < 7; day++) {
                const dateKey = d.toISOString().split('T')[0];
                let count = calendarMap.get(dateKey) || 0;

                // Requirement: Ignore all earlier submissions (before May 1, 2025)
                if (d < fixedStart) {
                    count = 0;
                }

                let intensity = 'bg-[#ebedf0]'; // Default gray (0)
                if (count > 0) intensity = 'bg-[#9be9a8]'; // Level 1
                if (count > 3) intensity = 'bg-[#40c463]'; // Level 2
                if (count > 6) intensity = 'bg-[#30a14e]'; // Level 3
                if (count > 10) intensity = 'bg-[#216e39]'; // Level 4 (Max)

                const future = d > today;

                weekData.push({
                    date: new Date(d),
                    count,
                    intensity,
                    future
                });

                d.setDate(d.getDate() + 1);
            }
            weeks.push(weekData);
        }

        return weeks;
    }, [submissionCalendar]);

    const formatTooltipDate = (date) => {
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex overflow-visible">
                {/* Days Labels (Mon, Wed, Fri) */}
                <div className="flex flex-col gap-[3px] mr-2 mt-[14px]">
                    <span className="text-[9px] text-gray-400 h-[10px] leading-[10px]"></span>
                    <span className="text-[9px] text-gray-400 h-[10px] leading-[10px]">Mon</span>
                    <span className="text-[9px] text-gray-400 h-[10px] leading-[10px]"></span>
                    <span className="text-[9px] text-gray-400 h-[10px] leading-[10px]">Wed</span>
                    <span className="text-[9px] text-gray-400 h-[10px] leading-[10px]"></span>
                    <span className="text-[9px] text-gray-400 h-[10px] leading-[10px]">Fri</span>
                    <span className="text-[9px] text-gray-400 h-[10px] leading-[10px]"></span>
                </div>

                <div className="flex gap-[3px]">
                    {calendarData.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-col gap-[3px]">
                            {week.map((day, dIndex) => (
                                !day.future && (
                                    <div
                                        key={dIndex}
                                        className={`w-[10px] h-[10px] rounded-[2px] ${day.intensity} relative group cursor-pointer`}
                                    >
                                        <div
                                            className={`absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-[10px] p-1 rounded whitespace-nowrap z-[100] pointer-events-none ${wIndex < 3
                                                    ? 'left-0'
                                                    : wIndex >= calendarData.length - 4
                                                        ? 'right-0'
                                                        : 'left-1/2 -translate-x-1/2'
                                                }`}
                                        >
                                            {day.count} submissions on {formatTooltipDate(day.date)}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1 text-[10px] text-gray-500 mr-4 mt-1">
                <span>Less</span>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#ebedf0]"></div>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#9be9a8]"></div>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#40c463]"></div>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#30a14e]"></div>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#216e39]"></div>
                <span>More</span>
            </div>
        </div>
    );
};

export default HeatmapGrid;
