import type { InquiryFormData } from '../types/types';

/**
 * sessionStorage から保存された問い合わせデータを取得する
 * @returns
 */
export const loadSession = (): InquiryFormData | null => {
  const saved = sessionStorage.getItem('inquiry');
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse session data', e);
    return null;
  }
};

/**
 * sessionStorage に問い合わせデータを保存する
 * @param state
 */
export const saveSession = (state: InquiryFormData): void => {
  sessionStorage.setItem('inquiry', JSON.stringify(state));
};

/**
 * sessionStorage から問い合わせデータを削除する
 * @returns
 */
export const clearSession = (): void => {
  sessionStorage.removeItem('inquiry');
};
