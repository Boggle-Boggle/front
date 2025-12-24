/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from 'components/Header';
import Icon from 'components/Icon';

import type { Promotion2025Response } from 'services/promotion';
import getPromotion2025 from 'services/promotion';

import { CommonBack } from 'assets/icons';

import lineImage from './assets/Line.png';
import starImage from './assets/Star.png';
import arrowImage from './assets/arrow.png';
import awards1 from './assets/awards1.png';
import awards2 from './assets/awards2.png';
import awards3 from './assets/awards3.png';
import awards4 from './assets/awards4.png';
import awards5 from './assets/awards5.png';
import typeBlueImage from './assets/blue.png';
import bookImage from './assets/book.png';
import cloudImage from './assets/cloud.png';
import crownImage from './assets/crown.png';
import typeGreenImage from './assets/green.png';
import hatImage from './assets/hat.png';
import promotionImage from './assets/main.png';
import promotionImage2 from './assets/main2.png';
import typePinkImage from './assets/pink.png';
import typePurpleImage from './assets/purple.png';
import typeRedImage from './assets/red.png';
import snowImage from './assets/snow.png';
import trophyImage from './assets/trophy.png';
import wigetImage from './assets/wiget.png';
import typeYellowImage from './assets/yellow.png';

const TrophyTitle = ({ text }: { text: string }) => {
  return (
    <>
      <img src={trophyImage} alt="trophy" className="mx-auto mt-16 w-[55px]" />
      <p className="relative z-10 mt-2 text-center font-maruburi text-[20px] font-semibold text-[#D82828]">{text}</p>
    </>
  );
};

const LineTitle = ({ text }: { text: string }) => {
  return (
    <div className="flex w-full items-center px-4">
      <span className="font-maruburi text-[24px] font-bold text-[#d82828]">{text}</span>
      <div className="ml-2 h-px flex-1 bg-[#CACACA]" />
    </div>
  );
};

const AnimatedSection = ({ children, threshold = 0.2 }: { children: ReactNode; threshold?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

const Christmas2025 = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'together' | 'solo'>('together');
  const [promotionData, setPromotionData] = useState<Promotion2025Response | null>(null);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const data = await getPromotion2025();
        setPromotionData(data);
      } catch (error) {

        console.error('크리스마스 프로모션 데이터를 불러오지 못했습니다.', error);
      }
    };

    fetchPromotion();
  }, []);

  const summary = promotionData?.summary ?? {
    totalBookCount: 0,
    excludePendingCount: 0,
    totalNoteCount: 0,
    averageRating: 0,
  };
  const bestBooks = promotionData?.ranking?.bestBooks ?? [];
  const readingStyleType = promotionData?.readingStyle?.styleType;
  const readingStyleCardMap: Record<
    Promotion2025Response['readingStyle']['styleType'],
    string
  > = {
    STEADY: typeRedImage, // 빨
    INTENSIVE: typePurpleImage, // 보
    LEISURELY: typeGreenImage, // 초
    WAVE: typeBlueImage, // 파
    STARTER: typePinkImage, // 핑
    FINISHER: typeYellowImage, // 노
  };
  const readingStyleCard = readingStyleType ? readingStyleCardMap[readingStyleType] : null;

  const pillBase =
    'flex-1 h-full rounded-full text-center text-title3 font-extrabold leading-none transition-all duration-150 active:scale-95';

  const handleDownload = () => {
    if (!readingStyleCard) return;

    const link = document.createElement('a');
    link.href = readingStyleCard;
    link.download = 'reading-style-card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pb-28">
      <Header
        title="빼곡한 연말결산"
        leftBtn={
          <button type="button" aria-label="뒤로가기" onClick={() => navigate('/myPage')}>
            <Icon Component={CommonBack} size="sm" />
          </button>
        }
      />
      <img src={promotionImage} alt="promotion" className="w-full object-cover" />
      {/* 버튼영역 */}
      <div className="relative">
        <img src={promotionImage2} alt="promotion" className="w-full object-cover" />

        <div className="absolute left-1/2 top-[95%] -translate-x-1/2 -translate-y-1/2">
          <div className="h-10 w-[21.4375rem] rounded-full bg-white p-0.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
            <div className="flex h-full w-full items-center gap-2">
              <button
                type="button"
                onClick={() => setMode('together')}
                className={`${pillBase} ${
                  mode === 'together'
                    ? 'bg-red text-white shadow-[0_4px_12px_rgba(214,35,33,0.35)]'
                    : 'text-neutral-40 bg-white'
                }`}
                aria-pressed={mode === 'together'}
              >
                같이 빼곡결산
              </button>
              <button
                type="button"
                onClick={() => setMode('solo')}
                className={`${pillBase} ${
                  mode === 'solo'
                    ? 'bg-red text-white shadow-[0_4px_12px_rgba(214,35,33,0.35)]'
                    : 'text-neutral-40 bg-white'
                }`}
                aria-pressed={mode === 'solo'}
              >
                혼자 빼곡결산
              </button>
            </div>
          </div>
        </div>
      </div>
      {mode === 'together' && (
        <div className="mt-12 flex flex-col items-center justify-center">
          <img src={hatImage} alt="hat" className="w-[55px]" />
          {/* 아이콘 */}
          <p className="whitespace-pre-line px-4 text-center font-maruburi text-[20px] font-semibold text-[#D82828]">
            여러분과 함께한 첫 한 해 동안, {'\n'}
            빼곡은 이만큼 성장했어요!
          </p>
          <div className="relative mt-6 flex items-center justify-center">
            <img src={wigetImage} alt="wiget" className="w-[228px]" />
            <div className="absolute inset-0 mt-2 flex flex-col items-center justify-center text-center text-[#D82828]">
              <span className="text-[16px]">올해 작성된 독서기록</span>
              <span className="mt-1 flex items-center gap-2 text-[28px] font-bold">
                <img src={arrowImage} alt="arrow" className="w-[25px]" />
                <span>11,048권</span>
                <img src={arrowImage} alt="arrow" className="w-[25px] scale-x-[-1]" />
              </span>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <img src={wigetImage} alt="wiget" className="w-[228px]" />
            <div className="absolute inset-0 mt-2 flex flex-col items-center justify-center text-center text-[#D82828]">
              <span className="text-[16px]">올해 작성된 독서노트</span>
              <span className="mt-1 flex items-center gap-2 text-[28px] font-bold">
                <img src={arrowImage} alt="arrow" className="w-[25px]" />
                <span>1,957장</span>
                <img src={arrowImage} alt="arrow" className="w-[25px] scale-x-[-1]" />
              </span>
            </div>
          </div>

          <p className="mt-20 whitespace-pre-line text-center text-[16px] text-[#888888]">
            빼곡의 시작을 함께해주신 여러분을 위해
            {'\n'}
            특별한 이벤트를 준비했어요
          </p>
          <TrophyTitle text="빼곡 어워즈" />
          <img src={cloudImage} alt="cloud" className="mx-auto -mt-6 h-32 w-full object-cover object-top" />

          <LineTitle text="빼곡한 올해의 책" />

          <div className="mt-2 flex w-full items-center px-4 py-4">
            <span className="relative flex size-[26px] items-center justify-center self-start rounded-full bg-[#D82828] text-[16px] font-semibold text-white">
              <img src={crownImage} alt="crown" className="absolute -top-4 left-1/2 w-[20px] -translate-x-1/2" />1
            </span>

            <img
              src="https://image.aladin.co.kr/product/31361/35/cover150/e282531099_1.jpg"
              alt="book"
              className="ml-2 h-[126px] w-[90px] rounded-lg"
            />
            <div className="flex flex-col pl-2">
              <span className="font-bold text-[#555555]">급류</span>
              <span className="text-[14px] text-[#888888]">정대건</span>
              <span className="text-[12px] text-[#888888]">총 94회 읽혔어요</span>
            </div>
          </div>

          <img src={lineImage} alt="line" className="w-full px-4" />

          <div className="mt-2 flex w-full items-center px-4 py-4">
            <span className="flex size-[22px] items-center justify-center self-start rounded-full bg-[#D82828] text-[14px] text-white">
              2
            </span>
            <img
              src="https://image.aladin.co.kr/product/27602/81/cover150/e672538937_1.jpg"
              alt="book"
              className="ml-[11px] h-[80px] w-[60px] rounded-md"
            />
            <div className="flex flex-col pl-2">
              <span className="font-bold text-[#888888]">홍학의 자리</span>
              <span className="text-[14px] text-[#888888]">정해연</span>
              <span className="text-[12px] text-[#888888]">총 72회 읽혔어요</span>
            </div>
          </div>

          <img src={lineImage} alt="line" className="w-full px-4" />

          <div className="mb-20 mt-2 flex w-full items-center px-4 py-4">
            <span className="flex size-[19px] items-center justify-center self-start rounded-full bg-[#D82828] text-[14px] text-white">
              3
            </span>
            <img
              src="https://image.aladin.co.kr/product/2584/37/cover200/8998441012_3.jpg"
              alt="book"
              className="ml-[9.51px] h-[70px] w-[50px] rounded-md"
            />
            <div className="flex flex-col pl-2">
              <span className="font-bold text-[#888888]">모순-개정판</span>
              <span className="text-[14px] text-[#888888]">양귀자</span>
              <span className="text-[12px] text-[#888888]">총 52회 읽혔어요</span>
            </div>
          </div>

          <LineTitle text="빼곡한 유저 어워즈" />
          <div className="px-4">
            <AnimatedSection>
              <img src={awards1} alt="awards1" className="mt-10 w-full" />
            </AnimatedSection>
            <AnimatedSection>
              <img src={awards2} alt="awards2" className="mt-6 w-full" />
            </AnimatedSection>
            <AnimatedSection>
              <img src={awards3} alt="awards3" className="mt-6 w-full" />
            </AnimatedSection>
            <AnimatedSection>
              <img src={awards4} alt="awards4" className="mt-6 w-full" />
            </AnimatedSection>
            <AnimatedSection>
              <img src={awards5} alt="awards5" className="mb-12 mt-6 w-full" />
            </AnimatedSection>
          </div>
        </div>
      )}

      {mode === 'solo' && (
        <>
          <div className="relative mb-4 mt-12 text-center font-maruburi text-[20px] font-semibold text-[#D82828]">
            <img src={starImage} alt="star" className="relative z-10 inline-block w-[20px]" />
            <p className="relative z-10 text-[14px] font-bold">2025년</p>
            <p className="relative z-10 text-[24px] font-bold">{summary.totalBookCount}권</p>
            <p className="relative z-10 text-[18px] font-bold">꽂으셨습니다</p>
            <div className="relative z-10 mx-auto mt-1 h-[20px] w-[10px] rounded-sm bg-[#D82828]" />

            <img src={snowImage} alt="snow" className="absolute left-36 top-0 w-[32px]" />
            <img src={snowImage} alt="snow" className="absolute bottom-4 right-32 w-[38px]" />
          </div>
          <div className="relative text-center text-[#d82828]">
            <img src={bookImage} alt="book" className="mx-auto h-[64px] w-[141px]" />
            <div className="leading- absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-[14px]">내가 읽은 책</p>
              <p className="text-[14px] font-bold">{summary.excludePendingCount}권</p>
            </div>
          </div>

          <div className="relative text-center text-[#d82828]">
            <img src={bookImage} alt="book" className="mx-auto h-[64px] w-[156px]" />
            <div className="leading- absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-[14px]">나의 독서노트</p>
              <p className="text-[14px] font-bold">{summary.totalNoteCount}장</p>
            </div>
          </div>

          <div className="relative text-center text-[#d82828]">
            <img src={bookImage} alt="book" className="mx-auto h-[64px] w-[141px]" />
            <div className="leading- absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-[14px]">평균 평점</p>
              <p className="text-[14px] font-bold">{summary.averageRating}점</p>
            </div>
          </div>

          <img src={cloudImage} alt="cloud" className="mx-auto -mt-10 h-40 w-full object-cover object-top" />

          {bestBooks.length > 0 && (
            <>
              <LineTitle text="빼곡한 올해의 나의 책" />
              {bestBooks[0] && (
                <>
                  <div className="flex w-full flex-col items-center px-4 py-4 text-center">
                    <div className="relative">
                      <span className="flex size-[26px] items-center justify-center rounded-full bg-[#D82828] text-[16px] font-semibold text-white">
                        1
                      </span>
                      <img src={crownImage} alt="crown" className="absolute -top-2 left-1/2 w-[20px] -translate-x-1/2" />
                    </div>
                    <img
                      src={bestBooks[0].imageUrl}
                      alt={bestBooks[0].title}
                      className="mb-3 mt-4 h-[126px] w-[90px] rounded-md"
                    />

                    <span className="text-[20px] font-bold text-[#555555]">{bestBooks[0].title}</span>
                    <span className="text-[#555555]">{bestBooks[0].publisher}</span>
                    <span className="text-[14px] text-[#888888]">총 {bestBooks[0].readCount}회 읽었어요</span>
                    <span className="text-[14px] text-[#888888]">독서노트 {bestBooks[0].noteCount}장 기록되었어요</span>
                    <span className="text-[14px] text-[#888888]">별점 {bestBooks[0].rating}점 남겼어요</span>
                  </div>

                  {bestBooks[1] && <img src={lineImage} alt="line" className="w-full px-4" />}
                </>
              )}

              {bestBooks[1] && (
                <>
                  <div className="flex w-full items-center px-4 py-4">
                    <span className="flex size-[26px] items-center justify-center self-start rounded-full bg-[#CACACA] text-[16px] font-semibold text-white">
                      2
                    </span>
                    <img
                      src={bestBooks[1].imageUrl}
                      alt={bestBooks[1].title}
                      className="ml-4 h-[126px] w-[90px] rounded-md"
                    />
                    <div className="flex h-[126px] flex-col justify-between pl-[10px]">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#555555]">{bestBooks[1].title}</span>
                        <span className="text-[14px] text-[#888888]">{bestBooks[1].publisher}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] text-[#888888]">총 {bestBooks[1].readCount}회 읽었어요</span>
                        <span className="text-[12px] text-[#888888]">독서노트 {bestBooks[1].noteCount}회 남겼어요</span>
                        <span className="text-[12px] text-[#888888]">별점 {bestBooks[1].rating}점 남겼어요</span>
                      </div>
                    </div>
                  </div>

                  {bestBooks[2] && <img src={lineImage} alt="line" className="w-full px-4" />}
                </>
              )}

              {bestBooks[2] && (
                <div className="flex w-full items-center px-4 py-4">
                  <span className="flex size-[26px] items-center justify-center self-start rounded-full bg-[#CACACA] text-[16px] font-semibold text-white">
                    3
                  </span>
                  <img
                    src={bestBooks[2].imageUrl}
                    alt={bestBooks[2].title}
                    className="ml-4 h-[126px] w-[90px] rounded-md"
                  />
                  <div className="flex h-[126px] flex-col justify-between pl-[10px]">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#555555]">{bestBooks[2].title}</span>
                      <span className="text-[14px] text-[#888888]">{bestBooks[2].publisher}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] text-[#888888]">총 {bestBooks[2].readCount}회 읽었어요</span>
                      <span className="text-[12px] text-[#888888]">독서노트 {bestBooks[2].noteCount}회 남겼어요</span>
                      <span className="text-[12px] text-[#888888]">별점 {bestBooks[2].rating}점 남겼어요</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {readingStyleCard && (
            <>
              <TrophyTitle text="독서 스타일 분석" />
              <AnimatedSection>
                <img
                  src={readingStyleCard}
                  alt="reading-style-card"
                  className="m-auto my-8 w-[300px]"
                  style={{ boxShadow: '0px 0px 12px 0px #0000001A' }}
                  onClick={handleDownload}
                />
              </AnimatedSection>
            </>
          )}
        </>
      )}

      <div className="px-4 pb-40 pt-8 font-bold text-[#888888]">
        참고해주세요
        <ul className="mt-6 pl-4 text-[14px] font-normal leading-[120%]">
          <li className="mt-1 list-disc">
            본 연말결산은 2025년 1월 1일부터 12월 24일까지의 차곡차곡 쌓인 독서 기록을 바탕으로 만들어졌어요.
          </li>
          <li className="mt-1 list-disc">집계 기준일에 따라 최신 정보와 일부 차이가 발생할 수 있습니다.</li>
          <li className="mt-1 list-disc">
            기록이 없는 책은 집계에 포함되지 않으며, 일부 수치는 통계 처리 과정에서 차이가 날 수 있습니다.
          </li>
          <li className="mt-1 list-disc">본 결과는 재미와 회고를 위한 콘텐츠로, 참고용으로 제공됩니다 </li>
        </ul>
      </div>
    </div>
  );
};

export default Christmas2025;
