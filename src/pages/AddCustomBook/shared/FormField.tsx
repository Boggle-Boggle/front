import { Control, Controller, FieldPath, FieldValues, UseFormResetField } from 'react-hook-form';

import { Input } from 'components/Input';

const MSG_ADD_CUSTOM_BOOK_OPTIONAL = '(선택)';

type FormFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  control: Control<T>;
  resetField?: UseFormResetField<T>;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: string;
  min?: number;
  max?: number;
  maxLength?: number;
};

export const FormField = <T extends FieldValues>(props: FormFieldProps<T>) => {
  const { name, label, placeholder, control, resetField, required = false, multiline = false, rows, type, min, max, maxLength } = props;

  const handleClear = () => {
    if (!resetField || multiline) return;

    resetField(name);
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex items-center gap-1">
        <p className="text-body1">{label}</p>
        {!required && <span className="text-caption1 text-information">{MSG_ADD_CUSTOM_BOOK_OPTIONAL}</span>}
      </div>

      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Input
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            onClear={handleClear}
            placeholder={placeholder}
            multiline={multiline}
            rows={rows}
            type={type}
            min={min}
            max={max}
            maxLength={maxLength}
          />
        )}
      />
    </div>
  );
};
