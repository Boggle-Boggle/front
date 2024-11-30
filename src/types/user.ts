export type Terms = {
  version: string;
  terms: Term[];
};

export type Term = {
  id: number;
  title: string;
  content: string;
  mandatory: boolean;
  agree: boolean;
};

export type AgreementStatus = {
  id: number;
  idAgree: true;
};
