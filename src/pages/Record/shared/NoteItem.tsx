import { CiShoppingTag } from 'react-icons/ci';

const NoteItem = () => {
  return (
    <section className="border-b-4 border-main p-7 text-center">
      <p className="font-bold">파과를 읽고 느낀점을 작성해보시오. </p>
      <p className="pb-4 pt-2 text-xs opacity-50"> 2024년 12월 22일 p.334</p>
      <p className="pb-[0.875rem] text-xs leading-5">
        각급 선거관리위원회는 선거인명부의 작성등 선거사무와 국민투표사무에 관하여 관계 행정기관에 필요한 지시를 할 수
        있다. 헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다. 민주평화통일자문회의의 조직·직무범위 기타
        필요한 사항은 법률로 정한다. 공무원의 직무상 불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는
        공공단체에 정당한 배상을 청구할 수 있다.
      </p>
      <div className="border-t-[1px] border-main pt-[0.875rem] font-bold">
        <p>
          <CiShoppingTag style={{ width: '18px', height: '18px', display: 'inline', marginBottom: '3px' }} /> 태그
        </p>
        <p className="mt-1 text-xs opacity-70">#인용 #느낀점 #줄거리</p>
      </div>
    </section>
  );
};

export default NoteItem;
