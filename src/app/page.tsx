'use client';

import { useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { zhTW } from 'date-fns/locale';
import { useIsMounted } from '@/hooks';
import holidayData from '@/data/processed/2026.json';

/** 將 YYYYMMDD 格式字串轉換為 Date 物件 */
const parseDate = (dateStr: string): Date => {
    const year = parseInt(dateStr.slice(0, 4), 10);
    const month = parseInt(dateStr.slice(4, 6), 10) - 1;
    const day = parseInt(dateStr.slice(6, 8), 10);
    return new Date(year, month, day);
};

const Home = () => {
    const isMounted = useIsMounted();

    /** 取得所有假日的 Date 陣列 */
    const holidayDates = useMemo(() => holidayData.filter((d) => d.isHoliday).map((d) => parseDate(d.date)), []);

    if (!isMounted) return null; // 避免日期轉換造成 hydration error

    return (
        <>
            <Calendar
                // 選擇模式：single=單選 / range=範圍選擇 / multiple=多選
                mode="single"
                // 日曆外框樣式
                className="rounded-lg border shadow"
                // 語系設定，使用繁體中文
                locale={zhTW}
                // 是否顯示非當月的日期（灰色日期）
                showOutsideDays={false}
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
                    // 月份容器：使用 grid 排版，響應式調整欄數
                    months: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
                }}
            />
        </>
    );
};

export default Home;
