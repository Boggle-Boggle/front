import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToastStore } from 'stores/useToastStore';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import Loading from 'pages/Loading';

import { getMyBlocks, unblockUser } from '../api';

const MSG_BLOCKED_USERS_TITLE = '차단한 유저 확인하기';
const MSG_BLOCKED_USERS_SUFFIX = ' 님';
const MSG_BLOCKED_USERS_STATUS = '차단됨';
const MSG_BLOCKED_USERS_EMPTY = '차단한 유저가 없습니다.';
const MSG_UNBLOCK_SUCCESS = '차단이 해제되었습니다.';
const MSG_UNBLOCK_FAILED = '차단 해제에 실패했습니다. 다시 시도해주세요.';

const BlockedUsers = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const { data, isLoading } = useQuery({
    queryKey: ['users', 'me', 'blocks'],
    queryFn: () => getMyBlocks(),
  });

  const { mutate: unblock } = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me', 'blocks'] });
      addToast({
        description: MSG_UNBLOCK_SUCCESS,
        type: 'success',
      });
    },
    onError: () => {
      addToast({
        description: MSG_UNBLOCK_FAILED,
        type: 'error',
      });
    },
  });

  const handleUnblock = (userId: number) => {
    unblock(userId);
  };

  if (isLoading) return <Loading />;

  const blockedUsers = data?.items ?? [];

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_BLOCKED_USERS_TITLE} withBack />

      {blockedUsers.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-body2 text-neutral-60">
          {MSG_BLOCKED_USERS_EMPTY}
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom pt-5">
          {blockedUsers.map((user, index) => {
            const borderClass = index !== blockedUsers.length - 1 ? 'border-b border-neutral-20' : '';

            return (
              <div
                key={user.userId}
                className={`flex w-full px-mobile ${borderClass} h-[4.5rem] items-center justify-between`}
              >
                <p className="text-title4">
                  {user.nickname}
                  <span>{MSG_BLOCKED_USERS_SUFFIX}</span>
                </p>

                <Button
                  width="short"
                  size="small"
                  variant="warning"
                  onClick={() => handleUnblock(user.userId)}
                >
                  {MSG_BLOCKED_USERS_STATUS}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlockedUsers;

