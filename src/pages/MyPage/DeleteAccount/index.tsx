import { useState } from 'react';

import useDevice from 'hooks/useDevice';

import { DrawType } from 'types/user';

import Complete from './Complete';
import DrawAccount from './DrawAccount';
import SelectDrawType from './SelectDrawType';

type StepType = '탈퇴유형선택' | '탈퇴상세' | '완료';

const DeleteAccount = () => {
  const [step, setStep] = useState<StepType>('탈퇴유형선택');
  const [drawType, setDrawType] = useState<DrawType | null>(null);

  const { isIOS } = useDevice();

  return (
    <section className="h-full bg-white">
      <section
        className={`${step !== '완료' ? (isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd') : 'h-full'} flex flex-col justify-between p-8`}
      >
        {step === '탈퇴유형선택' && (
          <SelectDrawType
            onNext={() => {
              setStep('탈퇴상세');
            }}
            drawType={drawType}
            setDrawType={setDrawType}
          />
        )}
        {step === '탈퇴상세' && (
          <DrawAccount
            drawType={drawType}
            onNext={() => {
              setStep('완료');
            }}
          />
        )}
        {step === '완료' && <Complete />}
      </section>
    </section>
  );
};

export default DeleteAccount;
