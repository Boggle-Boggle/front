import IconButton from 'components/Button/IconButton';
import { TextButton } from 'components/Button/TextButton';
import { IconEdit, IconEllipsisVertical } from 'components/icons';

const NOTE_COUNT_TEXT = '8개의 독서 노트가 있습니다';
const NOTE_MORE_TEXT = '노트 전체보기';

const NOTE_TAGS = ['해시태그', '해시태그', '해시태그'];

const NOTE_CARDS = [
  {
    number: '4',
    title: '2회독_400p',
    content:
      '하나 혹은 적은 수의 생명체에 처음으로 생명이 깃들고 이 행성이 중력의 법칙에 따라 도는 동안 너무나도 간단한 기원으로부터 끝없는 생명들이 가장 아름답고, 가장 놀랍도록 존재해 왔고, 존재하고 있으며, 진화해 왔다. 이러한 생명관에는 장엄함이 있다.',
    date: '0000.00.00 00:00',
    tags: NOTE_TAGS,
    extraCount: '+12',
  },
  {
    number: '3',
    title: '2회독_301p',
    content:
      '하나 혹은 적은 수의 생명체에 처음으로 생명이 깃들고 이 행성이 중력의 법칙에 따라 도는 동안 너무나도 간단한 기원으로부터 끝없는 생명들이 가장 아름답고, 가장 놀랍도록 존재해 왔고, 존재하고 있으며, 진화해 왔다. 이러한 생명관에는 장엄함이 있다.',
    date: '0000.00.00 00:00',
    tags: NOTE_TAGS,
    extraCount: '+12',
  },
  {
    number: '2',
    title: '2회독_202p',
    content:
      '하나 혹은 적은 수의 생명체에 처음으로 생명이 깃들고 이 행성이 중력의 법칙에 따라 도는 동안 너무나도 간단한 기원으로부터 끝없는 생명들이 가장 아름답고, 가장 놀랍도록 존재해 왔고, 존재하고 있으며, 진화해 왔다. 이러한 생명관에는 장엄함이 있다.',
    date: '0000.00.00 00:00',
    tags: NOTE_TAGS,
    extraCount: '+12',
  },
  {
    number: '1',
    title: '2회독_102p',
    content:
      '하나 혹은 적은 수의 생명체에 처음으로 생명이 깃들고 이 행성이 중력의 법칙에 따라 도는 동안 너무나도 간단한 기원으로부터 끝없는 생명들이 가장 아름답고, 가장 놀랍도록 존재해 왔고, 존재하고 있으며, 진화해 왔다. 이러한 생명관에는 장엄함이 있다.',
    date: '0000.00.00 00:00',
    tags: NOTE_TAGS,
    extraCount: '+12',
  },
  {
    number: '4',
    title: '1회독_202p',
    content:
      '하나 혹은 적은 수의 생명체에 처음으로 생명이 깃들고 이 행성이 중력의 법칙에 따라 도는 동안 너무나도 간단한 기원으로부터 끝없는 생명들이 가장 아름답고, 가장 놀랍도록 존재해 왔고, 존재하고 있으며, 진화해 왔다. 이러한 생명관에는 장엄함이 있다.',
    date: '0000.00.00 00:00',
    tags: NOTE_TAGS,
    extraCount: '+12',
  },
];

export const NoteTab = () => {
  const handleMoreClick = () => {};
  const handleFloatingClick = () => {};
  const handleCardMenuClick = () => {};

  const cardShadow = 'shadow-[0_2px_10px_rgba(0,0,0,0.16)]';

  return (
    <section className="pb-safe-bottom">
      <div className="flex items-center justify-between">
        <p className="text-caption1 text-neutral-60">{NOTE_COUNT_TEXT}</p>
        <TextButton onClick={handleMoreClick} text={NOTE_MORE_TEXT} size="md" variant="default" />
      </div>

      <ul className="mt-6">
        {NOTE_CARDS.map((card) => (
          <li key={`${card.number}-${card.title}`} className={`mb-5 rounded-2xl px-4 py-6 ${cardShadow}`}>
            {/* 카드 헤더 */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-h2 text-neutral-80">{card.number}</span>
                <p className="break-words text-caption1 text-neutral-60">{card.title}</p>
              </div>

              <IconButton
                onClick={handleCardMenuClick}
                label="메모 더보기"
                icon={IconEllipsisVertical}
                size="sm"
                align="right"
              />
            </div>

            {/* 카드 본문 */}
            <div className="mt-3">
              <p className="break-words text-body1 text-neutral-80">{card.content}</p>
              <p className="mt-2 text-caption1 text-neutral-60">{card.date}</p>
            </div>

            {/* 카드 푸터 */}
            {/* TODO 각 해시태그 컴포넌트화 */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={`${card.title}-${tag}`}
                    className="inline-flex items-center rounded-full border border-primary px-2 py-0.5 text-caption1 text-primary"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-caption1 text-neutral-60">{card.extraCount}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 독서노트 작성 플로팅 */}
      <div className="fixed bottom-6 right-mobile">
        <IconButton onClick={handleFloatingClick} label="독서 노트 작성" icon={IconEdit} size="md" />
      </div>
    </section>
  );
};
