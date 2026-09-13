import { Checkbox } from 'components/Checkbox';

import { SectionTitle } from './SectionTitle';

type VisibilitySectionProps = {
  checked: boolean;
  onChange: () => void;
  isEdit?: boolean;
};

const MSG_ADD_RECORD_HIDE_TITLE = '책장에서 책 표시하지 않기';
const MSG_ADD_RECORD_HIDE_DESCRIPTION = '내 책장에서 이 책을 표시하지 않기';

export const VisibilitySection = (props: VisibilitySectionProps) => {
  const { checked, onChange, isEdit = false } = props;

  return (
    <section className="w-full" data-isedit={isEdit}>
      <SectionTitle title={MSG_ADD_RECORD_HIDE_TITLE} />

      <button
        type="button"
        onClick={isEdit ? onChange : undefined}
        disabled={!isEdit}
        className={`mt-3 flex h-[3.125rem] w-full items-center gap-2 rounded-lg border border-neutral-20 bg-neutral-0 px-4 text-left outline-none ${
          isEdit ? 'cursor-pointer' : 'cursor-default opacity-80'
        }`}
      >
        <Checkbox id="record-visibility-checkbox" checked={checked} onChange={() => {}} size="xs" disabled={!isEdit} />
        <span className="flex-1 text-body1 text-neutral-80">{MSG_ADD_RECORD_HIDE_DESCRIPTION}</span>
      </button>
    </section>
  );
};
