/**
 * 完了画面の要素を動的に生成する
 * @returns HTMLDivElement
 */
export function createCompleteContent(): HTMLDivElement {
  const completeContent = document.createElement('div');
  completeContent.className =
    'rounded-lg border border-slate-300 bg-slate-50 p-5 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100';
  const p = document.createElement('p');
  p.textContent = 'お問い合わせを受け付けました。\n内容を確認の上、担当者よりご連絡いたします。';
  completeContent.appendChild(p);
  console.log('完了画面生成');

  return completeContent;
}
