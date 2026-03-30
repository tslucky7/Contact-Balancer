import type { InquiryFormData } from '../types/types';

/**
 * stateのデータをフォームに更新する
 * @param form
 * @param state
 */
export const writeForm = (
  form: HTMLFormElement,
  state: InquiryFormData,
): void => {
  (form.elements.namedItem('name') as HTMLInputElement).value =
    state.name || '';
  (form.elements.namedItem('email') as HTMLInputElement).value =
    state.email || '';
  (form.elements.namedItem('subject') as HTMLSelectElement).value =
    state.subject || '';
  (form.elements.namedItem('message') as HTMLTextAreaElement).value =
    state.message || '';
};

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
