'use client';

import { ComponentProps, useState, useTransition } from 'react';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { zhTW } from 'date-fns/locale';
import { useIsMounted } from '@/hooks';
import holidayData from '@/data/processed/2026.json';
import type { DayButton } from 'react-day-picker';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

/** 將 YYYYMMDD 格式字串轉換為 Date 物件 */
const parseDate = (dateStr: string): Date => {
    const year = parseInt(dateStr.slice(0, 4), 10);
    const month = parseInt(dateStr.slice(4, 6), 10) - 1;
    const day = parseInt(dateStr.slice(6, 8), 10);
    return new Date(year, month, day);
};

/** 將 Date 物件格式化為 YYYYMMDD 字串，用於查詢對應表 */
const formatDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

/** 日期到備註的對應表（模組層級常數，只建立一次） */
const descriptionMap = new Map<string, string>(
    holidayData.filter((d) => d.description).map((d) => [d.date, d.description]),
);

/** 假日日期陣列（模組層級常數，只建立一次） */
const holidayDates = holidayData.filter((d) => d.isHoliday).map((d) => parseDate(d.date));

/** 自訂 DayButton 元件：在日期下方顯示備註 */
const CustomDayButton = (props: ComponentProps<typeof DayButton>) => {
    const dateKey = formatDateKey(props.day.date);
    const description = descriptionMap.get(dateKey);

    return (
        <CalendarDayButton {...props}>
            {/* 顯示原本的日期數字 */}
            {props.children}
            {/* 顯示備註文字，若無備註則顯示空白佔位 */}
            {description && (
                <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger asChild>
                        <span className="truncate w-full px-0.5 line-clamp-1">{description}</span>
                    </HoverCardTrigger>
                    <HoverCardContent className="flex w-64 flex-col gap-0.5">
                        <div>{props['aria-label']}</div>
                        <div className="text-muted-foreground mt-1">{description}</div>
                    </HoverCardContent>
                </HoverCard>
            )}
        </CalendarDayButton>
    );
};

const Home = () => {
    const isMounted = useIsMounted();

    // 受控的選擇狀態
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    // useTransition: 將狀態更新標記為低優先級，讓 UI 保持響應
    const [, startTransition] = useTransition();

    // React Compiler 會自動處理 memoization，不需要手動 useMemo
    const components = { DayButton: CustomDayButton };

    // 處理日期選擇，使用 transition 讓更新不阻塞 UI
    const handleSelect = (dates: Date[] | undefined) => {
        startTransition(() => {
            setSelectedDates(dates ?? []);
        });
    };

    if (!isMounted) return null; // 避免日期轉換造成 hydration error

    return (
        <>
            <Calendar
                // 選擇模式：multiple=多選（讓使用者可以選擇多個日期）
                mode="multiple"
                // 受控的選擇狀態
                selected={selectedDates}
                // 選擇事件處理（使用 transition 優化）
                onSelect={handleSelect}
                // 日曆外框樣式
                className="rounded-lg border shadow"
                // 語系設定，使用繁體中文
                locale={zhTW}
                // 是否顯示非當月的日期（灰色日期）
                showOutsideDays={false}
                // 星期起始日：0=週日, 1=週一（預設看 locale）
                weekStartsOn={0}
                // 同時顯示的月份數量
                numberOfMonths={12}
                // 禁用月份切換功能
                disableNavigation
                // 完全隱藏導覽箭頭
                hideNavigation
                // 預設顯示的起始月份（2026 年 1 月）
                defaultMonth={new Date(2026, 0)}
                // 自訂修飾符：將假日標記為 holiday 群組
                modifiers={{ holiday: holidayDates }}
                // 修飾符對應的樣式：假日顯示為紅色
                modifiersClassNames={{ holiday: 'text-red-500' }}
                // 覆寫內部元素的 CSS 類別
                classNames={{
                    // 因為要放文字，建議把格子撐大一點
                    day: 'h-12 w-12 p-0',
                    // 月份容器：使用 grid 排版，響應式調整欄數
                    months: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
                }}
                // 自訂元件：使用帶有備註顯示的 DayButton
                components={components}
            />
        </>
    );
};

export default Home;
