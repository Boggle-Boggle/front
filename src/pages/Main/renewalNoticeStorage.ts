import { STORAGE_KEY } from 'constants/storage';

const PROMOTION_ID = '20261031_renewal-notice';
const PROMOTION_STORAGE_KEY = `${STORAGE_KEY.PROMOTION_DISMISSED_PREFIX}${PROMOTION_ID}`;

export const shouldShowMainRenewalNotice = () => window.localStorage.getItem(PROMOTION_STORAGE_KEY) !== 'true';

export const dismissMainRenewalNotice = () => {
  window.localStorage.setItem(PROMOTION_STORAGE_KEY, 'true');
};
