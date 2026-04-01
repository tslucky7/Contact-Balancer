import { STEPS } from '../types/types';
import { loadSession, writeForm } from '../adapters/formDataAdapter';

/**
 * ルートを処理する
 * @returns
 */
export const routeHandler = (): void => {
  const pathname = window.location.pathname;

  switch (pathname) {
    case STEPS.EDIT:
      console.log('case: STEPS.EDIT');

      break;
    case STEPS.CONFIRM:
      console.log('case: STEPS.CONFIRM');

      // 入力データがない場合は入力画面へ戻すなどの制御もここで行う
      if (
        !loadSession()?.name ||
        !loadSession()?.email ||
        !loadSession()?.subject ||
        !loadSession()?.message
      ) {
        history.replaceState(null, '', STEPS.EDIT);
        break;
      }

      break;
    case STEPS.COMPLETE:
      // URLが完了画面で読み込まれた場合は自動的に入力画面に戻す
      console.log('case: STEPS.COMPLETE');
      history.replaceState(null, '', STEPS.EDIT);

      break;
    default:
      // それ以外（空や #edit）なら、入力画面を表示する（デフォルトは入力画面）
      console.log('case: default');

      break;
  }
};

/**
 * sessionStorage からフォームの各入力欄に値を復元する
 */
// const restoreFormFromSession = (form: HTMLFormElement): void => {
//   const savedValues = loadSession();
//   if (!savedValues) return;

//   // フォームの各要素に値をセットする
//   writeForm(form, savedValues);
// };

/**
 * sessionStorage から状態を復元する
 */
// const setStateFromSession = (form: HTMLFormElement): void => {
//   const savedValues = loadSession();
//   if (!savedValues) return;

//   writeForm(form, savedValues);
// };
