import { useRef } from 'react';

import { BookCover } from 'components/BookCover';
import IconButton from 'components/Button/IconButton';
import { Header } from 'components/Header';
import { ShelfBase } from 'components/ShelfBase';
import { IconEllipsisVertical } from 'components/icons';

import { useHeaderTitleByScroll } from 'hooks/useHeaderTitleByScroll';

import noImage from 'assets/img/no_image.png';

type RecordDetailHeroProps = {
  cover: string | null;
  title: string;
  author: string;
  rating?: string;
  readingStatus?: string;
  noteCount?: string;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
};

const HERO_SHELF_PRIMARY_HEIGHT = 42;
const HERO_SHELF_SECONDARY_HEIGHT = 128;
const HERO_TITLE_PULL_UP_REM = '-7.0625rem';

const MSG_RECORD_DETAIL_MORE = '더보기';
const MSG_RECORD_DETAIL_RATING = '별점';
const MSG_RECORD_DETAIL_READING_STATUS = '독서 상태';
const MSG_RECORD_DETAIL_NOTE_COUNT = '독서 노트';

const HERO_SHELF_PRIMARY_GRADIENT = 'linear-gradient(180deg, rgba(238, 238, 238, 1) 0%, rgba(255, 255, 255, 1) 100%)';
// 브라우저 렌더링 엔진(WebKit 등)의 서브픽셀 둥글림 버그 및 투명도 겹침 경계선 아티팩트 해결을 위해,
// 엘리먼트 자체 opacity를 제거하는 대신 그라데이션 자체에 0.3 및 0% 알파 값을 직접 주입(bake-in)합니다.
const HERO_SHELF_SECONDARY_GRADIENT =
  'linear-gradient(180deg, rgba(202, 202, 202, 0.3) 0%, rgba(238, 238, 238, 0.3) 60%, rgba(255, 255, 255, 0) 100%)';

type HeroStatItemProps = {
  label: string;
  value: string;
  isLeading?: boolean;
};

const HeroStatItem = (props: HeroStatItemProps) => {
  const { label, value, isLeading = false } = props;

  return (
    <div className="flex w-20 flex-col items-center gap-1">
      <p className="text-caption2 text-neutral-60">{label}</p>
      <div className="flex items-center gap-1 text-body2 text-neutral-100">
        {isLeading && (
          <span className="text-base leading-none" style={{ color: '#FFE23C' }}>
            ★
          </span>
        )}
        <span className="font-bold">{value}</span>
      </div>
    </div>
  );
};

export const RecordDetailHero = (props: RecordDetailHeroProps) => {
  const {
    cover,
    title,
    author,
    rating = '0.0',
    readingStatus = '읽는중',
    noteCount = '6개',
    scrollContainerRef,
  } = props;

  const titleRef = useRef<HTMLParagraphElement>(null);

  // 스크롤 시 도서 타이틀 영역이 헤더 위치에 도달하면 헤더에 타이틀을 표시하기 위한 훅 바인딩
  const { isVisible } = useHeaderTitleByScroll({
    rootRef: scrollContainerRef,
    targetRef: titleRef,
  });

  const headerTitle = isVisible ? title : undefined;

  // 표지 이미지가 없거나 null인 경우 기본 모킹 표지 이미지를 적용합니다.
  const resolvedCover = cover || noImage;

  const handleMoreClick = () => {};

  return (
    <section className="relative overflow-hidden bg-neutral-0">
      {/* 배경 영역 */}
      {/* 아우터 컨테이너의 bg-[#303030]를 제거하여 서브픽셀 렌더링에 따른 미세한 어두운 경계선 유출을 근본적으로 방지합니다. */}
      <div className="absolute inset-x-0 top-0 h-80 overflow-hidden">
        <div className="absolute inset-0 bg-[#303030]">
          <img
            src={resolvedCover}
            alt=""
            aria-hidden
            className="h-full w-full scale-110 object-cover opacity-80 blur-[15px]"
          />
        </div>

        {/* 1. 이미지 위에 확실하게 얹혀 피그마의 안쪽 그림자를 완벽히 재현하는 오버레이 */}
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply shadow-[inset_0_26px_60.6px_5px_rgba(0,0,0,0.16)]" />

        {/* 2. 하단 자연스러운 흰색 트랜지션 페이드 그라데이션 */}
        <div className="absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-white to-transparent opacity-40" />

        {/* 서브픽셀 렌더링 시 발생하는 1px 오차를 완벽히 가리기 위해 하단 마진을 살짝 밀어내고 높이를 키웁니다 (bottom-[-2px] h-[3.9rem]) */}
        <div className="absolute inset-x-0 bottom-[-2px] h-[3.9rem] bg-white" />
      </div>

      <Header
        withBack
        withSpacer={false}
        transparent={!isVisible}
        title={headerTitle}
        rightBtn={<IconButton onClick={handleMoreClick} label={MSG_RECORD_DETAIL_MORE} icon={IconEllipsisVertical} />}
      />

      {/* 메인 컨텐츠 영역 */}
      <div className="relative z-book flex h-full flex-col items-center">
        {/* 헤더의 높이만큼 상단에 여백을 제공하여 투명 헤더와 컨텐츠가 겹치지 않도록 보정 */}
        <div className="mt-safe-top h-header w-full shrink-0" />

        <div className="flex w-full flex-1 flex-col items-center px-mobile pt-[2.125rem]">
          {/* 책 표지 (피그마 전용 109:152 비율 고정) */}
          <div className="relative z-book w-[7.875rem] shrink-0">
            <BookCover
              className="w-full"
              url={resolvedCover}
              label={title}
              variant="mockup"
              ratio={109 / 152}
              rounded="sm"
            />
          </div>

          {/* 책 선반 영역 (바깥으로 확장 + negative margin으로 책과 자연스럽게 겹치도록 설정) */}
          <div className="relative w-[calc(100%+2rem)] shrink-0" style={{ marginTop: '-1.5rem' }}>
            <ShelfBase height={HERO_SHELF_PRIMARY_HEIGHT} gradient={HERO_SHELF_PRIMARY_GRADIENT} layerOpacity={1} />
            {/* layerOpacity를 1로 보정하고 투명도를 그라데이션 색상 자체에 녹여 경계선 실선 문제를 완벽히 소멸시킵니다. */}
            <ShelfBase height={HERO_SHELF_SECONDARY_HEIGHT} gradient={HERO_SHELF_SECONDARY_GRADIENT} layerOpacity={1} />
          </div>

          {/* 타이틀 및 스펙 정보 섹션 */}
          <div className="relative flex w-full max-w-[21.4375rem] flex-col items-center px-[0.375rem]">
            <div className="w-full text-center" style={{ marginTop: HERO_TITLE_PULL_UP_REM }}>
              <p className="text-title2 text-neutral-100" ref={titleRef}>
                {title}
              </p>
              <p className="text-caption1 text-neutral-60">{author}</p>
            </div>

            <div className="mt-5 flex w-full items-center justify-between rounded-2xl bg-neutral-0 px-5 py-2 shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.2)]">
              <HeroStatItem label={MSG_RECORD_DETAIL_RATING} value={rating} isLeading />
              <div className="h-12 w-px bg-neutral-20" aria-hidden />
              <HeroStatItem label={MSG_RECORD_DETAIL_READING_STATUS} value={readingStatus} />
              <div className="h-12 w-px bg-neutral-20" aria-hidden />
              <HeroStatItem label={MSG_RECORD_DETAIL_NOTE_COUNT} value={noteCount} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecordDetailHero;
