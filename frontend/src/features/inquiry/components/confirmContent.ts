/**
 * 確認画面の内容を作成する
 * @param content
 * @returns
 */
export function createConfirmContent(content: string): HTMLDivElement {
  const confirmContent = document.createElement('div');
  confirmContent.className =
    'rounded-lg border border-slate-300 bg-slate-50 p-5 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100';
  const span = document.createElement('span');
  span.textContent = content;
  confirmContent.appendChild(span);

  return confirmContent;
}
