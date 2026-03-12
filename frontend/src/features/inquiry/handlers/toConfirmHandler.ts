import { dom, state } from '../state/context';
import { STEPS, type InquiryFormData } from '../types/types';
import { createConfirmContent } from '../components/confirmContent';
import { createButton } from '../components/button';
import { toEditHandler } from './toEditHandler';
import { submitHandler } from './submitHandler';
import { setHeading } from '../components/heading';
import { readForm, saveSession } from '../adapters/formDataAdapter';
import { validateInquiry, getValidationErrors, getValidationErrorMessage } from '../validation/inquiryValidator';

/**
 * ボタンのクリックに応じて確認画面を構築
 * @param event
 * @returns
 */
export const toConfirmHandler = (event: Event): void => {
  // 入力された情報を取得し、stateに代入する
  readForm(dom.form, state);
  // 必須項目が全て入力されているかをチェック
  const isValid = validateInquiry(state);

  if (!isValid) {
    event.preventDefault();
    const errors = getValidationErrors();
    const errorMessage = getValidationErrorMessage(errors);
    alert(errorMessage);
    return;
  }
  
  event.preventDefault();
  // 確認画面用のpathを追加する
  history.pushState({ step: STEPS.CONFIRM }, '', STEPS.CONFIRM);

  // 入力画面を非表示化
  dom.stepEdit.classList.add('hidden');
  dom.stepConfirm.replaceChildren();

  saveSession(state);

  // 確認画面の要素を作成
  setHeading('確認画面');

  renderConfirmFields(dom.stepConfirm, state);

  renderConfirmButtons(dom.stepConfirm);
};



/**
 * 確認画面の入力内容リストを生成し、DOMに追加する
 * @param container
 * @param state
 * @returns
 */
const renderConfirmFields = (container: HTMLElement, state: InquiryFormData): void => {
  const fields = [
    { label: 'お名前', value: state.name },
    { label: 'メールアドレス', value: state.email },
    { label: '件名', value: state.subject },
    { label: '内容', value: state.message },
  ];

  fields.forEach((field) => {
    const confirmContent = createConfirmContent(field.value);
    container.append(confirmContent);
  });
};

/**
 * 確認画面用のボタンセットを生成し、DOMに追加する
 * @param container
 * @returns
 */
const renderConfirmButtons = (container: HTMLElement): void => {
  const submitButton = createButton('submit', '送信する', submitHandler);
  const backButton = createButton('button', '入力画面へ戻る', toEditHandler);
  
  container.append(submitButton, backButton);
};
