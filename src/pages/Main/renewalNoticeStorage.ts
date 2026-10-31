import { STORAGE_KEY } from 'constants/storage';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const PROMOTION_ID = '20261031_renewal-notice';
const PROMOTION_STORAGE_KEY = `${STORAGE_KEY.PROMOTION_DISMISSED_UNTIL_PREFIX}${PROMOTION_ID}`;

export const shouldShowMainRenewalNotice = () => {
  const dismissedUntil = Number(window.localStorage.getItem(PROMOTION_STORAGE_KEY));
  return Date.now() >= dismissedUntil;
};

export const dismissMainRenewalNoticeForDay = () => {
  window.localStorage.setItem(PROMOTION_STORAGE_KEY, String(Date.now() + DAY_IN_MS));
};
