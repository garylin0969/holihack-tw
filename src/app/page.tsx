'use client';

import { Calendar } from '@/components/ui/calendar';
import { zhTW } from 'date-fns/locale';
import { useIsMounted } from '@/hooks';

const Home = () => {
    const isMounted = useIsMounted();
    if (!isMounted) return null; // 避免日期轉換造成 hydration error

    return (
        <>
            <Calendar
                mode="single" // 或 "range" / "multiple"
                className="rounded-lg border shadow"
                locale={zhTW} // 傳入語系屬性
                showOutsideDays={false} // 搭配隱藏非當月日期
                numberOfMonths={12}
                disableNavigation // 禁用左右切換箭頭
                hideNavigation // 加入這一行，箭頭就會完全消失
                defaultMonth={new Date(2026, 0)} // 固定起始月份為 2026 年 1 月
                // 使用 p-5 或自訂邊距，並利用 classNames 修改內部佈局
                classNames={{
                    months: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
                }}
            />
        </>
    );
};

export default Home;
