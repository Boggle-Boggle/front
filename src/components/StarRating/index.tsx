import type { KeyboardEvent, MouseEvent, TouchEvent } from 'react';

type StarRatingProps = {
  value: number;
  size?: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
  ariaLabel?: string;
};

const MSG_RATING_ARIA_LABEL = '{max}점 만점에 {value}점';
const MSG_RATING_EDIT_ARIA_LABEL = '별점을 선택하세요. 현재 {value}점';

const STAR_FILL_COLOR = '#FFE23C';
const STAR_EMPTY_COLOR = '#EEEEEE';

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const roundToHalf = (value: number) => {
  return Math.round(value * 2) / 2;
};

const formatMessage = (template: string, value: number, max: number) => {
  return template.replace('{value}', String(value)).replace('{max}', String(max));
};

const getStarFillPercent = (rating: number, index: number) => {
  const diff = rating - index;

  if (diff >= 1) return 100;
  if (diff >= 0.5) return 50;

  return 0;
};

const getRatingFromClientX = (clientX: number, rect: DOMRect, max: number) => {
  if (rect.width <= 0) {
    return 0;
  }

  const touchPosition = clamp(clientX - rect.left, 0, rect.width);
  const rawRating = (touchPosition / rect.width) * max;

  return roundToHalf(rawRating);
};

const StarShape = (props: { size: number; color: string; fillPercent?: number }) => {
  const { size, color, fillPercent } = props;
  const clipWidth = `${fillPercent ?? 100}%`;

  return (
    <span
      className="absolute left-0 top-0 overflow-hidden"
      style={{ width: clipWidth, height: size }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.0683 3.34647C18.0103 1.44935 18.4812 0.500796 19.1206 0.197749C19.6769 -0.0659164 20.3231 -0.0659164 20.8794 0.197749C21.5188 0.500796 21.9897 1.44935 22.9316 3.34646L26.1451 9.81885C26.4235 10.3794 26.5626 10.6597 26.7661 10.8773C26.9462 11.0699 27.1622 11.2259 27.4021 11.3367C27.6732 11.4617 27.9843 11.5067 28.6067 11.5966L35.7923 12.6345C37.8984 12.9387 38.9515 13.0908 39.439 13.6016C39.8632 14.046 40.0629 14.657 39.9825 15.2644C39.8902 15.9625 39.1282 16.7008 37.6041 18.1775L32.4046 23.2156C31.9542 23.6519 31.7291 23.8701 31.5838 24.1296C31.4552 24.3594 31.3726 24.6119 31.3408 24.8729C31.3049 25.1678 31.3581 25.4759 31.4644 26.092L32.6918 33.2058C33.0516 35.291 33.2315 36.3335 32.8934 36.9523C32.5993 37.4906 32.0764 37.8682 31.4705 37.9799C30.774 38.1083 29.8321 37.6161 27.9483 36.6316L21.5213 33.2729C20.9647 32.982 20.6863 32.8366 20.3931 32.7794C20.1335 32.7288 19.8665 32.7288 19.6069 32.7794C19.3137 32.8366 19.0353 32.982 18.4787 33.2729L12.0517 36.6316C10.1679 37.6161 9.226 38.1083 8.52954 37.9799C7.92359 37.8682 7.40073 37.4906 7.1066 36.9523C6.76853 36.3335 6.94842 35.291 7.30819 33.2058L8.53564 26.092C8.64195 25.4759 8.6951 25.1678 8.65917 24.8729C8.62736 24.6119 8.54484 24.3594 8.4162 24.1296C8.27092 23.8701 8.04575 23.6519 7.59542 23.2156L2.39588 18.1775C0.871848 16.7008 0.109832 15.9625 0.017463 15.2644C-0.0629028 14.657 0.13681 14.046 0.560978 13.6016C1.0485 13.0908 2.10158 12.9387 4.20773 12.6345L11.3933 11.5966C12.0157 11.5067 12.3268 11.4617 12.5979 11.3367C12.8378 11.2259 13.0538 11.0699 13.2339 10.8773C13.4374 10.6597 13.5765 10.3794 13.8549 9.81885L17.0683 3.34647Z"
          fill={color}
        />
      </svg>
    </span>
  );
};

export const StarRating = (props: StarRatingProps) => {
  const { value, size = 20, max = 5, readOnly = true, onChange, className, ariaLabel } = props;

  const boundedMax = Math.max(1, Math.floor(max));
  const displayValue = roundToHalf(clamp(value, 0, boundedMax));
  const wrapperBaseClass = 'inline-flex items-center gap-0.5';
  const wrapperInteractiveClass =
    readOnly || !onChange
      ? ''
      : 'cursor-pointer touch-none rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';
  const starContainerClass = 'relative inline-block';
  const resolvedAriaLabel =
    ariaLabel ??
    (readOnly
      ? formatMessage(MSG_RATING_ARIA_LABEL, displayValue, boundedMax)
      : formatMessage(MSG_RATING_EDIT_ARIA_LABEL, displayValue, boundedMax));

  const handleUpdateValue = (nextValue: number) => {
    if (readOnly || !onChange) return;

    onChange(roundToHalf(clamp(nextValue, 0, boundedMax)));
  };

  const handleMoveValue = (clientX: number, target: HTMLDivElement) => {
    const rect = target.getBoundingClientRect();
    const nextValue = getRatingFromClientX(clientX, rect, boundedMax);
    handleUpdateValue(nextValue);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (readOnly || !onChange) return;

    const touch = event.touches[0];

    if (!touch) return;

    handleMoveValue(touch.clientX, event.currentTarget);
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (readOnly || !onChange) return;

    handleMoveValue(event.clientX, event.currentTarget);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (readOnly || !onChange || event.buttons !== 1) return;

    handleMoveValue(event.clientX, event.currentTarget);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || !onChange) return;

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      handleUpdateValue(displayValue + 0.5);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      handleUpdateValue(displayValue - 0.5);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      handleUpdateValue(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      handleUpdateValue(boundedMax);
    }
  };

  const stars = Array.from({ length: boundedMax }, (_, index) => index + 1).map((starOrder) => {
    const fillPercent = getStarFillPercent(displayValue, starOrder - 1);

    return (
      <span
        key={`star-${starOrder}`}
        className={starContainerClass}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <StarShape size={size} color={STAR_EMPTY_COLOR} />
        <StarShape size={size} color={STAR_FILL_COLOR} fillPercent={fillPercent} />
      </span>
    );
  });

  if (readOnly || !onChange) {
    return (
      <div role="img" aria-label={resolvedAriaLabel} className={`${wrapperBaseClass} ${className ?? ''}`}>
        {stars}
      </div>
    );
  }

  return (
    <div
      role="slider"
      aria-label={resolvedAriaLabel}
      aria-valuemin={0}
      aria-valuemax={boundedMax}
      aria-valuenow={displayValue}
      tabIndex={0}
      className={`${wrapperBaseClass} ${wrapperInteractiveClass} ${className ?? ''}`}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
    >
      {stars}
    </div>
  );
};
