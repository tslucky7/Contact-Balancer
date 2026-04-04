import { useEffect, useState } from 'react';
import {
  STEPS,
  type InquiryFormData,
  type Step,
} from '../features/inquiry/types/types.ts';
import { createEmptyFormData } from '../features/inquiry/model/formData';
import {
  validateInquiry,
  getInquiryValidationMessage,
} from '../features/inquiry/validation/inquiryValidator';
import {
  clearSession,
  loadSession,
  saveSession,
} from '../features/inquiry/adapters/formDataAdapter';
import { submitAPI } from '../features/inquiry/api/api';

export const useInquiryForm = () => {
  const [step, setStep] = useState<Step>(STEPS.EDIT as Step);
  const [formData, setFormData] =
    useState<InquiryFormData>(createEmptyFormData);

  /**
   * - 読み込み時にSesstionStorageから入力内容を復元
   * - パスに応じてstepを更新し、urlのパスを制御
   */
  useEffect(() => {
    const savedData = loadSession();
    if (savedData) setFormData(savedData);
    const pathname = window.location.pathname;
    const { step, replaceTo } = resolveStepByPath(pathname, savedData);

    setStep(step);
    if (replaceTo) {
      history.replaceState(null, '', replaceTo);
    }
  }, []);

  /**
   * パスに応じてstepを更新する
   * - 確認画面ではSessionStorageにデータが保存されていれば、バリデーションを行い画面の状態を保つ
   * @param pathname
   * @param savedData
   * @returns { step: Step, replaceTo: string | null }
   */
  function resolveStepByPath(
    pathname: string,
    savedData: InquiryFormData | null,
  ) {
    switch (pathname) {
      case STEPS.EDIT:
        return { step: STEPS.EDIT };
      case STEPS.CONFIRM:
        if (!savedData || !validateInquiry(savedData)) {
          return { step: STEPS.EDIT, replaceTo: STEPS.EDIT };
        }
        return { step: STEPS.CONFIRM };
      case STEPS.COMPLETE:
        return { step: STEPS.EDIT, replaceTo: STEPS.EDIT };
      default:
        return { step: STEPS.EDIT, replaceTo: STEPS.EDIT };
    }
  }

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

    const message = getInquiryValidationMessage(formData);
    if (message) {
      alert(message);
      return;
    }

    setStep(STEPS.CONFIRM);
    setFormData(formData);
    saveSession(formData);
    history.pushState(null, '', STEPS.CONFIRM);
  };

  /**
   * 入力画面に戻る
   * @returns
   */
  const handleBackToEdit = () => {
    setStep(STEPS.EDIT);
    history.replaceState(null, '', STEPS.EDIT);
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

      clearSession();
      setStep(STEPS.COMPLETE);
      history.pushState(null, '', STEPS.COMPLETE);
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
