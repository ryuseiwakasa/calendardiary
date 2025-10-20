import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { ja } from 'date-fns/locale';

// 日付を YYYY-MM-DD 形式にフォーマット
export const formatDateKey = (date) => {
  return format(date, 'yyyy-MM-dd');
};

// 日付を表示用にフォーマット
export const formatDisplayDate = (date) => {
  return format(date, 'yyyy年M月d日', { locale: ja });
};

// 月の表示用フォーマット
export const formatMonthYear = (date) => {
  return format(date, 'yyyy年M月', { locale: ja });
};

// カレンダー表示用の日付配列を生成
export const generateCalendarDays = (currentDate) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // 日曜始まり
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = [];
  let day = calendarStart;

  while (day <= calendarEnd) {
    days.push({
      date: day,
      dateKey: formatDateKey(day),
      isCurrentMonth: isSameMonth(day, currentDate),
      isToday: isSameDay(day, new Date())
    });
    day = addDays(day, 1);
  }

  return days;
};

// 前月を取得
export const getPreviousMonth = (date) => {
  return subMonths(date, 1);
};

// 次月を取得
export const getNextMonth = (date) => {
  return addMonths(date, 1);
};

// 今日の日付を取得
export const getToday = () => {
  return new Date();
};

// 曜日のヘッダー
export const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];
