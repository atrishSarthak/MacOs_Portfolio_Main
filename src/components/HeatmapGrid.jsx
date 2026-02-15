import React, { useMemo } from 'react';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getIntensity(count) {
    if (count <= 0) return 'bg-[#ebedf0]';
    if (count <= 3) return 'bg-[#9be9a8]';
    if (count <= 6) return 'bg-[#40c463]';
    if (count <= 10) return 'bg-[#30a14e]';
    return 'bg-[#216e39]';
}

// Helper function to get current date in Pacific Time
function getPacificDate(date = new Date()) {
    return new Date(date.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
}

// Helper function to convert UTC timestamp to Pacific Time date string
function timestampToPacificDateString(timestamp) {
    const utcDate = new Date(parseInt(timestamp) * 1000);
    const pacificDate = new Date(utcDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    return pacificDate.toISOString().split('T')[0];
}

const HeatmapGrid = ({ submissionCalendar, compact = false, showDayLabels = false, groupByMonth = true }) => {
    const cellSize = compact ? 'w-[10px] h-[10px]' : 'w-[12px] h-[12px]';
    const gap = compact ? 'gap-[3px]' : 'gap-[4px]';
    const legendSize = compact ? 'text-[9px]' : 'text-[10px]';
    const rounded = compact ? 'rounded-[2px]' : 'rounded-[2px]';
    const legendBox = compact ? 'w-[10px] h-[10px] rounded-[2px]' : 'w-[12px] h-[12px] rounded-[2px]';

    const { calendarMap, monthBlocks } = useMemo(() => {
        let calendarObj = {};
        if (submissionCalendar) {
            if (typeof submissionCalendar === 'string') {
                try {
                    calendarObj = JSON.parse(submissionCalendar);
                } catch (e) {
                    calendarObj = {};
                }
            } else {
                calendarObj = submissionCalendar;
            }
        }

        const map = new Map();
        Object.entries(calendarObj).forEach(([timestamp, count]) => {
            const dateKey = timestampToPacificDateString(timestamp);
            map.set(dateKey, count);
        });

        // Use Pacific Time for "today"
        const today = getPacificDate();
        today.setHours(23, 59, 59, 999);
        const fixedStart = new Date('2025-05-01');
        if (today < fixedStart) return { calendarMap: map, monthBlocks: [] };

        const blocks = [];
        let monthDate = new Date(fixedStart.getFullYear(), fixedStart.getMonth(), 1);

        while (monthDate <= today) {
            const year = monthDate.getFullYear();
            const month = monthDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);

            const weekStart = new Date(firstDay);
            weekStart.setDate(firstDay.getDate() - firstDay.getDay());

            const weeks = [];
            for (let w = 0; w < 5; w++) {
                const weekStartDate = new Date(weekStart);
                weekStartDate.setDate(weekStart.getDate() + w * 7);
                const weekEndDate = new Date(weekStartDate);
                weekEndDate.setDate(weekStartDate.getDate() + 6);

                if (weekStartDate > lastDay) break;

                const rows = [];
                for (let d = 0; d < 7; d++) {
                    const cellDate = new Date(weekStartDate);
                    cellDate.setDate(weekStartDate.getDate() + d);

                    if (cellDate < firstDay || cellDate > lastDay || cellDate > today) {
                        rows.push(null);
                        continue;
                    }

                    const dateKey = cellDate.toISOString().split('T')[0];
                    let count = map.get(dateKey) || 0;
                    if (cellDate < fixedStart) count = 0;
                    rows.push({
                        date: new Date(cellDate),
                        count,
                        intensity: getIntensity(count),
                    });
                }
                if (rows.some((r) => r !== null)) {
                    weeks.push(rows);
                }
            }

            blocks.push({
                label: MONTH_LABELS[month],
                weeks,
            });

            monthDate.setMonth(monthDate.getMonth() + 1);
            monthDate.setDate(1);
        }

        return { calendarMap: map, monthBlocks: blocks };
    }, [submissionCalendar]);

    const formatTooltipDate = (date) => {
        const d = date.getDate();
        const m = MONTH_LABELS[date.getMonth()];
        const y = date.getFullYear();
        return `${d} ${m} ${y}`;
    };

    if (groupByMonth && monthBlocks.length > 0) {
        return (
            <div className="flex flex-col gap-1">
                <div className="flex overflow-x-auto overflow-y-hidden min-w-0 items-end pl-2">
                    {monthBlocks.map((block, blockIdx) => (
                        <div key={blockIdx} className="flex flex-col items-center shrink-0 mr-2 last:mr-0">
                            <div className={`flex ${gap}`}>
                                {block.weeks.map((week, weekIdx) => {
                                    // Calculate total weeks in this block for edge detection
                                    const totalWeeks = block.weeks.length;
                                    const isLeftEdge = weekIdx === 0; // First week only
                                    const isRightEdge = weekIdx === totalWeeks - 1; // Last week only


                                    return (
                                        <div key={weekIdx} className={`flex flex-col ${gap}`}>
                                            {week.map((cell, rowIdx) => {
                                                // Render empty cells as invisible spacers to preserve day-of-week alignment
                                                if (!cell) {
                                                    return <div key={rowIdx} className={`${cellSize} opacity-0 pointer-events-none flex-shrink-0`} />;
                                                }
                                                // Smart tooltip positioning to prevent clipping
                                                const isTopRow = rowIdx < 2; // First 2 rows

                                                // Determine vertical position
                                                const verticalPos = isTopRow ? 'top-full mt-1' : 'bottom-full mb-1';

                                                // Determine horizontal position
                                                let horizontalPos;
                                                if (isLeftEdge) {
                                                    horizontalPos = 'left-0';
                                                } else if (isRightEdge) {
                                                    horizontalPos = 'right-0';
                                                } else {
                                                    horizontalPos = 'left-1/2 -translate-x-1/2';
                                                }

                                                const tooltipClass = `absolute ${verticalPos} ${horizontalPos} hidden group-hover:block bg-black text-white text-[9px] p-1 rounded whitespace-nowrap z-[100] pointer-events-none`;

                                                return (
                                                    <div
                                                        key={rowIdx}
                                                        className={`${cellSize} ${rounded} ${cell.intensity} relative group cursor-pointer flex-shrink-0`}
                                                    >
                                                        <div className={tooltipClass}>
                                                            {cell.count} submissions on {formatTooltipDate(cell.date)}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                            <span className={`${legendSize} text-gray-500 mt-1.5 font-medium`}>{block.label}</span>
                        </div>
                    ))}
                </div>
                <div className={`flex items-center justify-end gap-0.5 ${legendSize} text-gray-500 mr-2 mt-0.5`}>
                    <span>Less</span>
                    <div className={`${legendBox} bg-[#ebedf0]`}></div>
                    <div className={`${legendBox} bg-[#9be9a8]`}></div>
                    <div className={`${legendBox} bg-[#40c463]`}></div>
                    <div className={`${legendBox} bg-[#30a14e]`}></div>
                    <div className={`${legendBox} bg-[#216e39]`}></div>
                    <span>More</span>
                </div>
            </div>
        );
    }

    const calendarData = useMemo(() => {
        // Use Pacific Time for "today"
        const today = getPacificDate();
        const fixedStart = new Date('2025-05-01');
        const start = new Date(fixedStart);
        start.setDate(start.getDate() - start.getDay());
        let d = new Date(start);
        const weeks = [];
        while (d <= today) {
            const weekData = [];
            for (let day = 0; day < 7; day++) {
                const dateKey = d.toISOString().split('T')[0];
                let count = calendarMap.get(dateKey) || 0;
                if (d < fixedStart) count = 0;
                const future = d > today;
                weekData.push({
                    date: new Date(d),
                    count,
                    intensity: getIntensity(count),
                    future,
                });
                d.setDate(d.getDate() + 1);
            }
            weeks.push(weekData);
        }
        return weeks;
    }, [calendarMap]);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex overflow-hidden min-w-0">
                {showDayLabels && (
                    <div className={`flex flex-col ${gap} mr-1.5 mt-[14px]`}>
                        {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, i) => (
                            <span key={i} className="text-[9px] text-gray-400 h-[10px] leading-[10px]">{label}</span>
                        ))}
                    </div>
                )}
                <div className={`flex flex-1 min-w-0 ${gap}`}>
                    {calendarData.map((week, wIndex) => (
                        <div key={wIndex} className={`flex flex-col ${gap}`}>
                            {week.map((day, dIndex) =>
                                !day.future ? (
                                    <div
                                        key={dIndex}
                                        className={`${cellSize} ${rounded} ${day.intensity} relative group cursor-pointer flex-shrink-0`}
                                    >
                                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-[9px] p-1 rounded whitespace-nowrap z-[100] pointer-events-none">
                                            {day.count} submissions on {formatTooltipDate(day.date)}
                                        </div>
                                    </div>
                                ) : null
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={`flex items-center justify-end gap-0.5 ${legendSize} text-gray-500 mr-2 mt-0.5`}>
                <span>Less</span>
                <div className={`${legendBox} bg-[#ebedf0]`}></div>
                <div className={`${legendBox} bg-[#9be9a8]`}></div>
                <div className={`${legendBox} bg-[#40c463]`}></div>
                <div className={`${legendBox} bg-[#30a14e]`}></div>
                <div className={`${legendBox} bg-[#216e39]`}></div>
                <span>More</span>
            </div>
        </div>
    );
};

export default HeatmapGrid;
