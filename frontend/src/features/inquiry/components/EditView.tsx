import type { InquiryFormData } from '../types/types';
import { InputField } from '../../../components/ui/Input';
import { TextareaField } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';
import { Heading } from '../../../components/ui/heading';

interface EditViewProps {
  data: InquiryFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onNext: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditView = ({ data, onChange, onNext }: EditViewProps) => {
  return (
    <div id="step-edit" className="flex flex-col gap-y-4">
      <Heading className="text-center">お問い合わせフォーム</Heading>
      <InputField
        label="お名前"
        name="name"
        type="text"
        value={data.name}
        onChange={onChange}
        placeholder="お名前"
        required
        autoComplete="name"
      />
      <InputField
        label="メール"
        name="email"
        type="email"
        value={data.email}
        onChange={onChange}
        placeholder="メール"
        required
        autoComplete="email"
      />
      <InputField
        label="件名"
        name="subject"
        type="text"
        value={data.subject}
        onChange={onChange}
        placeholder="件名"
        required
        autoComplete="subject"
      />
      <TextareaField
        label="内容"
        name="message"
        value={data.message}
        onChange={onChange}
        placeholder="内容"
        required
        autoComplete="message"
      />
      <Button
        buttonType="button"
        text="入力内容の確認へ進む"
        eventHandler={onNext}
        colorScheme="next"
      />
    </div>
  );
};
