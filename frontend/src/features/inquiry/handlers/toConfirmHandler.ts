import { state } from '../state/context';
import { STEPS } from '../types/types';
import { saveSession } from '../adapters/formDataAdapter';
import {
  validateInquiry,
  getValidationErrors,
  getValidationErrorMessage,
} from '../validation/inquiryValidator';

/**
 * ボタンのクリックに応じて確認画面を構築
 * @param event
 * @returns
 */
export const toConfirmHandler = (event: Event): void => {
  event.preventDefault();
  // 必須項目が全て入力されているかをチェック
  const isValid = validateInquiry(state);

  if (!isValid) {
    const errors = getValidationErrors();
    const errorMessage = getValidationErrorMessage(errors);
    alert(errorMessage);
    return;
  }

  // 確認画面用のpathを追加する
  history.pushState({ step: STEPS.CONFIRM }, '', STEPS.CONFIRM);

  saveSession(state);
};
