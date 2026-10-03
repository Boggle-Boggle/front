import { useNavigate } from 'react-router-dom';

import { Button } from 'components/Button';
import { Header } from 'components/Header';

import fallbackImage from 'assets/resource-fallback/resource-not-found-illustration.svg';

type ResourceFallbackType = 'bookNotFound' | 'readingLogNotFound';
type ResourceFallbackLocale = 'ko';

type ResourceFallbackMessage = {
  imageAlt: string;
  title: string;
  description: string;
  actionLabel: string;
};

type ResourceFallbackProps = {
  type: ResourceFallbackType;
  onAction?: () => void;
};

const DEFAULT_RESOURCE_FALLBACK_LOCALE: ResourceFallbackLocale = 'ko';

const RESOURCE_FALLBACK_MESSAGES: Record<
  ResourceFallbackLocale,
  Record<ResourceFallbackType, ResourceFallbackMessage>
> = {
  ko: {
    bookNotFound: {
      imageAlt: '리소스 없음',
      title: '책을 찾을 수 없어요',
      description: '주소가 바뀌었거나, 더 이상 제공되지 않는 책이에요.',
      actionLabel: '이전으로',
    },
    readingLogNotFound: {
      imageAlt: '리소스 없음',
      title: '독서 기록을 찾을 수 없어요',
      description: '삭제되었거나, 더 이상 접근할 수 없는 기록이에요.',
      actionLabel: '이전으로',
    },
  },
};

export const ResourceFallback = (props: ResourceFallbackProps) => {
  const { type, onAction } = props;
  const navigate = useNavigate();

  const { imageAlt, title, description, actionLabel } =
    RESOURCE_FALLBACK_MESSAGES[DEFAULT_RESOURCE_FALLBACK_LOCALE][type];

  const handleActionClick = () => {
    if (onAction) {
      onAction();
      return;
    }

    navigate(-1);
  };

  return (
    <>
      <Header withBack />

      <div className="flex h-full w-full flex-col items-center justify-center px-mobile text-center">
        <img src={fallbackImage} alt={imageAlt} className="w-full max-w-[12rem]" />
        <h1 className="text-title1">{title}</h1>
        <p className="mt-2 text-body2 text-neutral-60">{description}</p>
        <Button onClick={handleActionClick} variant="grey" width="short" className="mt-6">
          {actionLabel}
        </Button>
      </div>
    </>
  );
};
