import { ReactNode } from 'react';

import { Button } from 'components/Button';

type SectionButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export const SectionButton = (props: SectionButtonProps) => {
  const { children, onClick } = props;

  return (
    <Button variant="grey" onClick={onClick}>
      {children}
    </Button>
  );
};
