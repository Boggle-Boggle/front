import { Button } from 'components/Button';
import { Header } from 'components/Header';

const MSG_BLOCKED_USERS_TITLE = '차단한 유저 확인하기';
const MSG_BLOCKED_USERS_SUFFIX = ' 님';
const MSG_BLOCKED_USERS_STATUS = '차단됨';

const BLOCKED_USERS = [
  '개복어',
  '햇살속에',
  '소풍왔니',
  '블루지',
  '은하수',
  '노을빛',
  '명훈명훈',
  '앰비션',
  '빛의전사',
  '단단무지',
  '얏따',
  '산들바람',
] as const;

const BlockedUsers = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_BLOCKED_USERS_TITLE} withBack />

      <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom pt-5">
        {BLOCKED_USERS.map((nickname, index) => {
          const borderClass = index !== BLOCKED_USERS.length - 1 ? 'border-b border-neutral-20' : '';

          return (
            <div
              key={nickname}
              className={`flex w-full px-mobile ${borderClass} h-[4.5rem] items-center justify-between`}
            >
              <p className="text-title4">
                {nickname}
                <span>{MSG_BLOCKED_USERS_SUFFIX}</span>
              </p>

              <Button width="short" size="small" variant="warning" onClick={() => {}}>
                {MSG_BLOCKED_USERS_STATUS}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlockedUsers;
