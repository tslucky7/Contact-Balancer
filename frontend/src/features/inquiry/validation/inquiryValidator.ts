import schema from '../../../../../shared/schemas/inquiry.schema.json';
import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import type { InquiryFormData } from '../types/types';

const ajv = new Ajv();
ajvFormats(ajv);

/**
 * 問い合わせフォームの入力データを検証
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
export const getValidationErrors = (): string[] => {
  const errors = ajv.errors;
  return errors?.map((error) => error?.message ?? '') as string[] ?? [];
};

/**
 * 検証エラーメッセージの取得
 * @param errors
 * @returns
 */
export const getValidationErrorMessage = (errors: string[]): string => {
  return errors.join('\n');
};
