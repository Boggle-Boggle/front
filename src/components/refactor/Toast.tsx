import { IconCircleCancel, IconCircleCheck, IconCircleInfo } from 'components/icons';

export type ToastProps = {
  type: 'info' | 'error' | 'success';
  description: string;
  title?: string;
  dismissible?: boolean;
};

const Toast = ({ type, description, title, dismissible = false }: ToastProps) => {
  const borderClass = type === 'info' ? 'border-information' : type === 'error' ? 'border-danger' : 'border-primary';
  const icon =
    type === 'info' ? (
      <IconCircleInfo className="mr-1 text-information" />
    ) : type === 'error' ? (
      <IconCircleCancel className="mr-1 text-danger" />
    ) : (
      <IconCircleCheck className="mr-1 text-primary" />
    );

  return (
    <div className={`${borderClass} rounded-xl border px-4 py-2`}>
      {title && (
        <div className="mb-1 flex items-center text-body2 text-neutral-80">
          {icon}
          {title}
        </div>
      )}
      <div className={`flex items-center text-caption1 ${title ? 'text-neutral-60' : 'text-neutral-80'}`}>
        {!title && icon}
        {description}
      </div>
    </div>
  );
};

export default Toast;
