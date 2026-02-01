type SwitchProps = {
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Switch = ({ checked = false, onChange }: SwitchProps) => {
  return (
    <label htmlFor="switch">
      <input
        id="switch"
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
        aria-label="스위치"
      />
      <span className="relative block h-5 w-9 rounded-[23px] bg-neutral-40 p-[1px] peer-checked:bg-primary">
        <span
          className={`${checked ? 'left-[1.063rem]' : 'left-[0.063rem]'} absolute size-[1.125rem] rounded-full border-neutral-0 bg-neutral-0 transition-all duration-300`}
        />
      </span>
    </label>
  );
};

export default Switch;
