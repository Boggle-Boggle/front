import Header from 'components/Header';

const VersionInfo = () => {
  const cur = 'v1.0.0';
  const recent = 'v1.0.0';

  return (
    <section className="relative h-full bg-white">
      <Header title="버전 정보" />
      <section className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
        <p className="pt-12 font-semibold">{`현재 버전 : ${cur}`}</p>
        <p className="font-semibold text-accent">{`최신 버전 : ${recent}`}</p>
      </section>
    </section>
  );
};

export default VersionInfo;
