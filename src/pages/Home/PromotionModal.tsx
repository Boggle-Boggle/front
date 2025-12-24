import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import promotionMain from 'pages/Promotion/Christmas2025/assets/main.png';

const STORAGE_KEY = 'promotion2025_hide_until';
const HIDE_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

const PromotionModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const hideUntil = stored ? Number(stored) : 0;

    if (!hideUntil || hideUntil < Date.now()) {
      setOpen(true);
    }
  }, []);

  const persistPreference = () => {
    if (dontShow) {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + HIDE_DURATION_MS));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleClose = () => {
    persistPreference();
    setOpen(false);
  };

  const handleGo = () => {
    persistPreference();
    setOpen(false);
    navigate('/promotion/christmas2025');
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(0,0,0,0.45)] px-6">
      <div className="relative w-full max-w-[26rem] overflow-hidden rounded-3xl bg-white shadow-xl">
        <button
          type="button"
          aria-label="닫기"
          className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/80 text-2xl font-bold text-neutral-60 shadow-sm backdrop-blur active:scale-95"
          onClick={handleClose}
        >
          ×
        </button>
        <img src={promotionMain} alt="2025 빼곡한 연말결산" className="w-full" />

        <div className="flex items-center gap-2 px-6 py-4">
          <input
            id="promotion-hide-checkbox"
            type="checkbox"
            className="size-4 accent-accent"
            checked={dontShow}
            onChange={() => setDontShow((prev) => !prev)}
          />
          <label htmlFor="promotion-hide-checkbox" className="text-sm font-semibold text-neutral-80">
            다시보지 않기
          </label>
        </div>

        <div className="px-6 pb-6">
          <button
            type="button"
            className="h-12 w-full rounded-xl bg-accent text-base font-bold text-white shadow-md transition active:scale-[0.99]"
            onClick={handleGo}
          >
            연말결산 보러가기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PromotionModal;

