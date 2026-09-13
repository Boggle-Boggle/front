import { Empty } from 'components/Empty';
import { IconPlus } from 'components/icons';

import { SectionTitle } from './SectionTitle';
import type { BookshelfItem } from './api';

type GroupSectionProps = {
  bookshelves: BookshelfItem[];
  selectedBookshelfIds: number[];
  onOpenGroupEdit: () => void;
  onToggleBookshelf: (bookshelfId: number) => void;
  isEdit?: boolean;
};

const MSG_GROUP_SECTION_TITLE = '그룹 책장';
const MSG_NEW_GROUP_ADD = '새 그룹 만들기';
const MSG_NO_INCLUDED_GROUPS = '그룹 책장이 없어요.';

export const GroupSection = (props: GroupSectionProps) => {
  const { bookshelves, selectedBookshelfIds, onOpenGroupEdit, onToggleBookshelf, isEdit = false } = props;

  const visibleBookshelves = isEdit ? bookshelves : bookshelves.filter((b) => selectedBookshelfIds.includes(b.id));

  return (
    <section className="w-full" data-isedit={isEdit}>
      <SectionTitle title={MSG_GROUP_SECTION_TITLE} />
      <ul className="mt-3 flex flex-col gap-2">
        {isEdit && (
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
        )}

        {visibleBookshelves.map((bookshelf) => {
          const isSelected = selectedBookshelfIds.includes(bookshelf.id);

          return (
            <li key={bookshelf.id} className="w-full">
              <button
                type="button"
                onClick={isEdit ? () => onToggleBookshelf(bookshelf.id) : undefined}
                disabled={!isEdit}
                className={`flex h-[2.625rem] w-full items-center justify-center rounded-lg border-[1.5px] px-4 text-title4 font-bold transition-all ${
                  isEdit ? 'cursor-pointer' : 'cursor-default'
                } ${isSelected ? 'border-primary bg-neutral-0 text-primary' : 'border-neutral-20 text-neutral-80'}`}
              >
                {bookshelf.name}
              </button>
            </li>
          );
        })}

        {!isEdit && visibleBookshelves.length === 0 && <Empty text={MSG_NO_INCLUDED_GROUPS} />}
      </ul>
    </section>
  );
};
