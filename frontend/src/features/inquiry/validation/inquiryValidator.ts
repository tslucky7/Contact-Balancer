import schema from '../../../../../shared/schemas/inquiry.schema.json';
import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import type { InquiryFormData } from '../types/types';

const ajv = new Ajv();
ajvFormats(ajv);

/**
 * 問い合わせフォームの入力データの検証を行う
 * @param data
 * @returns
 */
export const validateInquiry = (data: InquiryFormData): boolean => {
  const isValid = ajv.validate(schema, data);
  return isValid;
};

/**
 * 検証エラーの取得
 * @returns
 */
const getValidationErrors = (): string[] => {
  const errors = ajv.errors;
  return (errors?.map((error) => error?.message ?? '') as string[]) ?? [];
};

/**
 * 検証エラーメッセージの取得
 * @param errors
 * @returns
 */
const getValidationErrorMessage = (errors: string[]): string => {
  return errors.join('\n');
};

/**
 * 問い合わせフォームの入力データの検証をし、データに不備があればエラーメッセージを取得
 * @param data
 * @returns
 */
export const getInquiryValidationMessage = (
  data: InquiryFormData,
): string | null => {
  const isValid = validateInquiry(data);
  if (!isValid) {
    const errors = getValidationErrors();
    return getValidationErrorMessage(errors);
  }
  return null;
};
