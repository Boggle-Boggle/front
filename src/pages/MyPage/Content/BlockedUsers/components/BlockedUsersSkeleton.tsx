import { Header } from 'components/Header';

const BLOCKED_USERS_SKELETON_ITEMS = Array.from({ length: 6 }, (_, index) => `blocked-users-skeleton-${index}`);

const MSG_BLOCKED_USERS_TITLE = '차단한 유저 확인하기';

export const BlockedUsersSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_BLOCKED_USERS_TITLE} withBack />

      <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom pt-5">
        {BLOCKED_USERS_SKELETON_ITEMS.map((item, index) => {
          const borderClass = index !== BLOCKED_USERS_SKELETON_ITEMS.length - 1 ? 'border-b border-neutral-20' : '';

          return (
            <div key={item} className={`flex h-[4.5rem] w-full items-center justify-between px-mobile ${borderClass}`}>
              <div className="skeleton h-5 w-28" />
              <div className="skeleton h-8 w-20 rounded-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
