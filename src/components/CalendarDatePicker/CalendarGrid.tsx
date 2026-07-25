export type CalendarDate = {
  date: Date;
  dateKey: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  isInBetween?: boolean;
  isSelected?: boolean;
  hasRangeConnection?: boolean;
};

type CalendarDayButtonProps = {
  calendarDate: CalendarDate;
  onSelectDate: (date: Date) => void;
};

type CalendarGridProps = {
  calendarDates: CalendarDate[];
  onSelectDate: (date: Date) => void;
};

const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const KOREAN_WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const formatDateSelectButtonText = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDay = KOREAN_WEEK_DAYS[date.getDay()];

  return `${year}년 ${month}월 ${day}일(${weekDay}) 선택`;
};

const CalendarDayButton = (props: CalendarDayButtonProps) => {
  const { calendarDate, onSelectDate } = props;
  const { date, isCurrentMonth, isToday, isStart, isEnd, isInBetween, isSelected, hasRangeConnection } = calendarDate;

  const handleClick = () => {
    onSelectDate(date);
  };

  const isHighlighted = isSelected || isStart || isEnd;
  const dateTextClassName = isCurrentMonth ? 'text-neutral-80' : 'text-neutral-40';
  const circleTextClassName = isHighlighted ? 'text-neutral-0' : dateTextClassName;
  const todayLabelClassName = isCurrentMonth ? 'text-neutral-80' : 'text-neutral-40';

  // 피그마 시안(2282-20745)에 따른 시작일/종료일 개별 배경색 지정
  const circleBgClassName = isHighlighted ? 'bg-primary' : '';

  return (
    <div className="flex w-full flex-col items-center gap-[0.3125rem]">
      {/* 날짜 숫자 컨테이너 (높이 30px 고정하여 기간배경 중심 정렬) */}
      <div className="relative flex h-[1.875rem] w-full items-center justify-center">
        {/* 기간 선택 연결 배경 (시작일과 종료일이 모두 성립한 hasRangeConnection 일 때만 띠를 활성화) */}
        {isInBetween && hasRangeConnection && (
          <div className="absolute inset-y-0 left-0 right-0 bg-primary opacity-20" />
        )}
        {isStart &&
          isEnd &&
          // 시작일과 종료일이 같은 날인 경우 배경 생략
          null}
        {isStart && !isEnd && hasRangeConnection && (
          // 시작일이고 종료일이 뒤에 성립되어 있을 때: 동그라미 우측 1/2 지점부터 우측 끝까지 반투명 배경 채움
          <div className="absolute inset-y-0 left-1/2 right-0 bg-primary opacity-20" />
        )}
        {isEnd && !isStart && hasRangeConnection && (
          // 종료일이고 시작일이 앞에 성립되어 있을 때: 좌측 끝부터 동그라미의 1/2 지점까지 반투명 배경 채움
          <div className="absolute inset-y-0 left-0 right-1/2 bg-primary opacity-20" />
        )}

        {/* 실제 클릭 핫스팟 및 숫자 동그라미 */}
        <button
          type="button"
          aria-label={formatDateSelectButtonText(date)}
          onClick={handleClick}
          className={`relative z-10 grid size-[1.875rem] place-items-center rounded-full text-caption1 ${circleTextClassName} ${circleBgClassName} outline-none transition-colors`}
        >
          {date.getDate()}
        </button>
      </div>

      {/* 오늘 라벨 표시 영역 (오늘이 아니더라도 상하 높이 균일화 유지를 위해 빈 공간 항상 확보) */}
      <div className="flex h-[0.625rem] items-center justify-center">
        {isToday ? (
          <span className={`text-caption2 ${todayLabelClassName} leading-[0.625rem]`}>오늘</span>
        ) : (
          <div className="h-[0.625rem]" />
        )}
      </div>
    </div>
  );
};

export const CalendarGrid = (props: CalendarGridProps) => {
  const { calendarDates, onSelectDate } = props;

  return (
    <>
      <div className="grid grid-cols-7 text-center font-pretendard text-caption3 text-neutral-60">
        {WEEK_DAYS.map((weekDay) => (
          <span key={weekDay} className="py-2">
            {weekDay}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-y-1">
        {calendarDates.map((calendarDate) => (
          <CalendarDayButton key={calendarDate.dateKey} calendarDate={calendarDate} onSelectDate={onSelectDate} />
        ))}
      </div>
    </>
  );
};
