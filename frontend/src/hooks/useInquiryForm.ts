import { useState } from 'react';
import type { InquiryFormData } from '../features/inquiry/types/types';
import schema from '../../../shared/schemas/inquiry.schema.json';
import {
  validateInquiry,
  getValidationErrors,
  getValidationErrorMessage,
} from '../features/inquiry/validation/inquiryValidator';
import { saveSession } from '../features/inquiry/adapters/formDataAdapter';
import { submitAPI } from '../features/inquiry/api/api';

type FormStep = 'edit' | 'confirm' | 'complete';

export const useInquiryForm = () => {
  const [step, setStep] = useState<FormStep>('edit');

  /**
   * 空のフォームデータを作成する
   * @returns
   */
  const createEmptyFormData = (): InquiryFormData => {
    const keys = Object.keys(schema.properties) as (keyof InquiryFormData)[];
    return Object.fromEntries(keys.map((k) => [k, ''])) as InquiryFormData;
  };
  const [formData, setFormData] = useState<InquiryFormData>(
    () => createEmptyFormData(),
  );

  /**
   * フォームのデータを更新する
   * - inputのonChangeイベントで呼び出される
   * - 今までの入力内容をコピーし、変更された箇所のみを更新
   * @param e
   * @returns
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * 確認画面に遷移する
   * - バリデーションを行い、エラーがある場合はエラーメッセージを表示
   * - エラーがない場合は確認画面に遷移
   * @param event
   * @returns
   */
  const handleToConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const isValid = validateInquiry(formData);
    if (!isValid) {
      const errors = getValidationErrors();
      alert(getValidationErrorMessage(errors));
      return;
    }

    setStep('confirm');
    setFormData(formData);
    saveSession(formData);
    // router.push('/confirm') など
  };

  /**
   * 入力画面に戻る
   * @returns
   */
  const handleBackToEdit = () => {
    setStep('edit');
  };

  /**
   * 完了画面に遷移する
   * @param event
   * @returns
   */
  const handleToComplete = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const target = event.target as HTMLButtonElement;
    if (!(target.type === 'submit')) {
      console.error('submitHandler: event is not a SubmitEvent');
      return;
    }

    event.preventDefault();

    const payload = { ...formData };
    try {
      const json = await submitAPI(payload);
      console.log('Response JSON:', json);

      // todo: 完了画面表示用の関数に分離する
      sessionStorage.removeItem('inquiry');
      setStep('complete');
    } catch (error) {
      console.error('The connection failed.', error);
    }
  };

  return {
    step,
    formData,
    setFormData,
    handleChange,
    handleToConfirm,
    handleBackToEdit,
    handleToComplete,
  };
};
