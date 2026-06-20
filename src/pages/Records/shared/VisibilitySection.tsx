import { SectionTitle } from './SectionTitle';

type VisibilitySectionProps = {
  onClick: () => void;
};

const MSG_ADD_RECORD_HIDE_TITLE = '책장에서 책 표시하지 않기';
const MSG_ADD_RECORD_HIDE_DESCRIPTION = '내 책장에서 이 책을 표시하지 않기';

export const VisibilitySection = (props: VisibilitySectionProps) => {
  const { onClick } = props;

  return (
    <section className="w-full">
      <SectionTitle title={MSG_ADD_RECORD_HIDE_TITLE} />

      {/* TODO 버튼 수정필요 */}
      <button
        type="button"
        onClick={onClick}
        className="mt-3 flex h-[3.125rem] w-full items-center gap-1 rounded-lg border border-neutral-20 bg-neutral-0 px-2 text-left"
      >
        <span className="size-6" aria-hidden="true" />
        <span className="flex-1 text-body1 text-neutral-80">{MSG_ADD_RECORD_HIDE_DESCRIPTION}</span>
        <span className="size-6" aria-hidden="true" />
      </button>
    </section>
  );
};
