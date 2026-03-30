import { STEPS } from '../types/types';

/**
 * 完了画面を動的に表示する
 * @returns
 */
export const toCompleteHandler = (): void => {
  sessionStorage.removeItem('inquiry');

  console.log('送信完了');
  history.pushState({ step: STEPS.COMPLETE }, '', STEPS.COMPLETE);
};
