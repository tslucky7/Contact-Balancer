import type { InquiryFormData } from '../types/types.ts';
import schema from '../../../../../shared/schemas/inquiry.schema.json';

/**
   * 空のフォームデータを作成する
   * @returns
  */
export const createEmptyFormData = (): InquiryFormData => {
  const keys = Object.keys(schema.properties) as (keyof InquiryFormData)[];
  return Object.fromEntries(keys.map((k) => [k, ''])) as InquiryFormData;
};
