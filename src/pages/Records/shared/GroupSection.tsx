import { ChangeEvent } from 'react';

import { Checkbox } from 'components/Checkbox';

import { SectionTitle } from './SectionTitle';
import { GROUP_ITEMS } from './mock';

type GroupSectionProps = {
  selectedGroups: string[];
  onOpenGroupEdit: () => void;
  onToggleGroup: (group: string) => () => void;
};

const MSG_GROUP_SECTION_TITLE = '그룹';
const MSG_GROUP_EDIT = '그룹 관리';

export const GroupSection = (props: GroupSectionProps) => {
  const { selectedGroups, onOpenGroupEdit, onToggleGroup } = props;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <SectionTitle title={MSG_GROUP_SECTION_TITLE} />
        <button type="button" onClick={onOpenGroupEdit} className="text-caption1 font-medium text-neutral-60 underline">
          {MSG_GROUP_EDIT}
        </button>
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {GROUP_ITEMS.map((group) => {
          const isSelected = selectedGroups.includes(group);
          const handleChange = (_event: ChangeEvent<HTMLInputElement>) => {
            onToggleGroup(group)();
          };

          return (
            <li
              key={group}
              className="flex min-h-12 items-center justify-between rounded-lg border border-neutral-20 px-4"
            >
              <label htmlFor={`record-group-${group}`} className="flex-1 text-body1 text-neutral-80">
                {group}
              </label>
              <Checkbox id={`record-group-${group}`} checked={isSelected} onChange={handleChange} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
