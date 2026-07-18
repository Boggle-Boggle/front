import { Checkbox } from 'components/Checkbox';

import { SectionTitle } from './SectionTitle';

type VisibilitySectionProps = {
  checked: boolean;
  onChange: () => void;
};

const MSG_ADD_RECORD_HIDE_TITLE = '책장에서 책 표시하지 않기';
const MSG_ADD_RECORD_HIDE_DESCRIPTION = '내 책장에서 이 책을 표시하지 않기';

export const VisibilitySection = (props: VisibilitySectionProps) => {
  const { checked, onChange } = props;

  return (
    <section className="w-full">
      <SectionTitle title={MSG_ADD_RECORD_HIDE_TITLE} />

      <button
        type="button"
        onClick={onChange}
        className="mt-3 flex h-[3.125rem] w-full items-center gap-2 rounded-lg border border-neutral-20 bg-neutral-0 px-4 text-left outline-none"
      >
        <Checkbox id="record-visibility-checkbox" checked={checked} onChange={() => {}} size="xs" />
        <span className="flex-1 text-body1 text-neutral-80">{MSG_ADD_RECORD_HIDE_DESCRIPTION}</span>
      </button>
    </section>
  );
};
