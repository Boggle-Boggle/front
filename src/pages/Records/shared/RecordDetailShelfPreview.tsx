import { BookCover } from 'components/BookCover';
import { Header } from 'components/Header';
import { ShelfBase } from 'components/ShelfBase';

import noImage from 'assets/img/no_image.png';

type RecordDetailShelfPreviewProps = {
  cover?: string | null;
  title?: string;
  author?: string;
};

const SHELF_PRIMARY_HEIGHT = 42;
const SHELF_SECONDARY_HEIGHT = 128;
const BACKGROUND_HEIGHT = 289;
const COVER_TOP = 125;
const COVER_WIDTH = 126;
const SHELF_TOP = 259;
const TITLE_PULL_UP = -113;

const SHELF_PRIMARY_GRADIENT = 'linear-gradient(180deg, rgba(238, 238, 238, 1) 0%, rgba(255, 255, 255, 1) 100%)';
const SHELF_SECONDARY_GRADIENT =
  'linear-gradient(180deg, rgba(202, 202, 202, 0.3) 0%, rgba(238, 238, 238, 0.3) 60%, rgba(255, 255, 255, 0) 100%)';

export const RecordDetailShelfPreview = (props: RecordDetailShelfPreviewProps) => {
  const { cover, title = '비눗방울 퐁', author = '이유리 (지은이)' } = props;
  const resolvedCover = cover || noImage;

  return (
    <section className="relative min-h-dvh overflow-hidden bg-neutral-0">
      <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: BACKGROUND_HEIGHT }}>
        <div className="absolute inset-0 bg-[#303030]">
          <img
            src={resolvedCover}
            alt=""
            aria-hidden
            className="h-full w-full scale-110 object-cover opacity-80 blur-[15px]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply shadow-[inset_0_26px_60.6px_5px_rgba(0,0,0,0.16)]" />
        <div className="absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-white to-transparent opacity-40" />
      </div>

      <Header withBack withSpacer={false} transparent />

      <div className="relative z-book pt-safe-top">
        <div className="relative h-[31.25rem]">
          <div className="absolute left-1/2 z-book -translate-x-1/2" style={{ top: COVER_TOP, width: COVER_WIDTH }}>
            <BookCover
              className="w-full"
              url={resolvedCover}
              label={title}
              variant="mockup"
              ratio={109 / 152}
              rounded="sm"
            />
          </div>

          <div className="absolute inset-x-0 z-shelf" style={{ top: SHELF_TOP }}>
            <ShelfBase height={SHELF_PRIMARY_HEIGHT} gradient={SHELF_PRIMARY_GRADIENT} layerOpacity={1} />
            <ShelfBase height={SHELF_SECONDARY_HEIGHT} gradient={SHELF_SECONDARY_GRADIENT} layerOpacity={1} />
          </div>

          <div
            className="absolute inset-x-mobile z-book flex flex-col items-center text-center"
            style={{ top: SHELF_TOP + SHELF_PRIMARY_HEIGHT + SHELF_SECONDARY_HEIGHT + TITLE_PULL_UP }}
          >
            <p className="text-title2 text-neutral-100">{title}</p>
            <p className="text-caption1 text-neutral-60">{author}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
