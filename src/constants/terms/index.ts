import { PRIVACY_POLICY_CONTENT, PRIVACY_POLICY_TITLE } from './privacyPolicy';
import { TERMS_OF_SERVICE_CONTENT, TERMS_OF_SERVICE_TITLE } from './termsOfService';

export { PRIVACY_POLICY_TITLE, TERMS_OF_SERVICE_TITLE };

export const TERM_ID = {
  PRIVACY_POLICY: 1,
  TERMS_OF_SERVICE: 2,
} as const;

export type TermId = (typeof TERM_ID)[keyof typeof TERM_ID];

export type TermContent = {
  id: TermId;
  title: string;
  content: string;
};

export const TERM_BY_ID: Record<TermId, TermContent> = {
  [TERM_ID.PRIVACY_POLICY]: {
    id: TERM_ID.PRIVACY_POLICY,
    title: PRIVACY_POLICY_TITLE,
    content: PRIVACY_POLICY_CONTENT,
  },
  [TERM_ID.TERMS_OF_SERVICE]: {
    id: TERM_ID.TERMS_OF_SERVICE,
    title: TERMS_OF_SERVICE_TITLE,
    content: TERMS_OF_SERVICE_CONTENT,
  },
};

export type SignUpTerm = {
  id: TermId;
  title: string;
  required: boolean;
};

export const SIGNUP_TERMS: SignUpTerm[] = [
  {
    id: TERM_ID.PRIVACY_POLICY,
    title: PRIVACY_POLICY_TITLE,
    required: true,
  },
  {
    id: TERM_ID.TERMS_OF_SERVICE,
    title: TERMS_OF_SERVICE_TITLE,
    required: true,
  },
];
