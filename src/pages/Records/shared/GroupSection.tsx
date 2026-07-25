import { IconPlus } from 'components/icons';

import { SectionTitle } from './SectionTitle';
import type { BookshelfItem } from './api';

type GroupSectionProps = {
  bookshelves: BookshelfItem[];
  selectedBookshelfIds: number[];
  onOpenGroupEdit: () => void;
  onToggleBookshelf: (bookshelfId: number) => () => void;
};

const MSG_GROUP_SECTION_TITLE = '그룹 설정하기';
const MSG_NEW_GROUP_ADD = '새 그룹 만들기';

export const GroupSection = (props: GroupSectionProps) => {
  const { bookshelves, selectedBookshelfIds, onOpenGroupEdit, onToggleBookshelf } = props;

  return (
    <section className="w-full">
      <SectionTitle title={MSG_GROUP_SECTION_TITLE} />

      <ul className="mt-3 flex flex-col gap-2">
        <li className="w-full">
          <button
            type="button"
            onClick={onOpenGroupEdit}
            className="flex h-[2.625rem] w-full items-center justify-center gap-1 rounded-lg border-[1.5px] border-primary bg-primary text-title4 font-bold text-neutral-0 transition-all hover:opacity-90 active:opacity-80"
          >
            <IconPlus className="size-4 text-neutral-0" />
            <span>{MSG_NEW_GROUP_ADD}</span>
          </button>
        </li>

        {bookshelves.map((bookshelf) => {
          const isSelected = selectedBookshelfIds.includes(bookshelf.id);

          return (
            <li key={bookshelf.id} className="w-full">
              <button
                type="button"
                onClick={onToggleBookshelf(bookshelf.id)}
                className={`flex h-[2.625rem] w-full items-center justify-center rounded-lg border-[1.5px] px-4 text-title4 font-bold transition-all ${
                  isSelected
                    ? 'border-primary bg-neutral-0 text-primary'
                    : 'border-neutral-20 bg-neutral-0 text-neutral-80'
                }`}
              >
                {bookshelf.name}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
