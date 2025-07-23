import Header from 'components/Header';

import useDevice from 'hooks/useDevice';

const QnA = () => {
  const { isIOS } = useDevice();
  return (
    <div className="h-full w-full bg-white">
      <Header title="자주묻는질문" />

      <section
        className={`${isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd'} overflow-y-scroll whitespace-pre-wrap px-4`}
      >
        <div className="mb-6">
          <p className="mb-2 text-lg font-semibold">📌 다른 기기에서 빼곡 서비스 이용이 가능한가요?</p>
          <p className="pl-4">
            <p className="mb-1"> 💬 물론이예요!</p>
            - 빼곡은 SNS계정을 통해 데이터가 저장되므로, 다른 핸드폰에서도 동일 계정으로 로그인한다면 이전에 사용하시던
            데이터를 그대로 이용하실 수 있어요. <br />- 추가적으로, 빼곡은 한개 계정당 한명의 데이터만 관리 가능하기
            때문에 다른계정으로 이용하고 싶으시다면 마이페이지에서 로그아웃한 뒤, 다른계정으로 로그인 해 주세요.
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-lg font-semibold">📌 현재 계정을 다른 계정으로 이전하고 싶어요.</p>
          <p className="pl-4">
            <p className="mb-1">
              {' '}
              💬 데이터 이전을 원하실 경우, 하단의 유의사항을 확인해주시고 이전을 위한 정보를 아래 메일로 보내주세요.
              빠른시일 내에 처리해드리겠습니다.
            </p>
            - MAIL : bbaegok@gmail.com
            <br />- 빼곡 앱 {'>'} 마이페이지 {'>'} 문의하기 에서도 문의가 가능해요.
            <p className="my-1 font-semibold">⚠️ 유의사항</p>
            - 문의 후 이전 완료 전까지는 신규계정에 대한 데이터 추가를 중단해주세요.
            <br />- 이전이 완료되면 기존 계정 정보는 삭제됩니다.
            <p className="my-1 font-semibold">🌟 계정이전을 위해 필요한 정보</p>
            - 기존 이메일 정보
            <br />- 신규 이메일 정보
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-lg font-semibold">📌 이용했던 계정이 뭔지 잊어버렸어요.</p>
          <p className="pl-4">
            <p className="mb-1">
              {' '}
              💬 빼곡 앱 내 마이페이지 {'>'} 문의하기 를 통해 빼곡에서 지원하는 SNS로그인계정(Kakao, Google,
              Apple)중에서 자주 사용하시는 이메일을 보내주세요.
            </p>
            - 닉네임 또는 기존에 저장한 3D책장 스크린 샷이 있으시면 함께 전달해주세요.
            <br />- 유사한 계정이 있는지 조회 후, 메일로 답변을 전달해드리겠습니다.
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-lg font-semibold">📌 회원탈퇴는 어떻게 하나요?</p>
          <p className="pl-4">
            <p className="mb-1"> 💬 빼곡 앱 내 마이페이지 {'>'} 회원탈퇴를 통해 탈퇴가 가능해요</p>- 오류가 발생했을
            경우, 마이페이지 {'>'} 문의하기를 통해 연락해주세요.
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-lg font-semibold">📌 다 읽은 책을 저장했는데 책장에 적용 되지 않아요</p>
          <p className="pl-4">
            <p className="mb-1"> 💬 홈 탭의 책장은 다 읽은 책 기준으로 페이지수에 따라 적용돼요.</p>- 책을 저장했는데
            책장에 적용되지 않는 경우 아래를 확인해주세요. <br />
            <p className="pl-4">
              1. 책 저장시 상태가 다 읽은책인지 <br />
              2. 책장이 꽉 차진 않았는지(책장의 확장기능은 앞으로 업데이트 될 예정이예요!) <br />
              3. 앱을 재시동 해 보세요.
            </p>
            - 위 내용을 모두 확인했음에도 반영되지 않는다면, 마이페이지 {'>'} 문의하기를 통해 의견을 전달해주시면
            답변해드리겠습니다!
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-lg font-semibold">📌 검색해도 나오지 않는 책이 있어요</p>
          <p className="pl-4">
            <p className="mb-1">
              {' '}
              💬 빼곡은 알라딘의 책 데이터베이스를 통해 책 정보를 제공하고 있어요. 따라서 간혹 검색한 책이 없는 경우가
              있을 수 있습니다.
            </p>
            - 차후 직접 책을 등록할 수 있도록 업데이트 예정이에요.
          </p>
        </div>
      </section>
    </div>
  );
};

export default QnA;
