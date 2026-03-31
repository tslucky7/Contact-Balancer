import { EditView } from './features/inquiry/components/EditView.tsx';
import { ConfirmView } from './features/inquiry/components/ConfirmView.tsx';
import { CompleteView } from './features/inquiry/components/CompleteView.tsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeSelect } from './components/ui/ThemeSelect';
import { useInquiryForm } from './hooks/useInquiryForm';

export default function InquiryForm() {
  const {
    step,
    formData,
    handleChange,
    handleToConfirm,
    handleToComplete,
    handleBackToEdit,
  } = useInquiryForm();

  return (
    <ThemeProvider>
      <ThemeSelect />
      <div className="container mx-auto max-w-3xl p-4 sm:p-8">
        <form id="inquiryForm" className="px-2">
          {step === 'edit' && (
            <EditView
              data={formData}
              onChange={handleChange}
              onNext={handleToConfirm}
            />
          )}
          {step === 'confirm' && (
            <ConfirmView
              data={formData}
              onBack={handleBackToEdit}
              onComplete={handleToComplete}
            />
          )}
          {step === 'complete' && <CompleteView data={formData} />}
        </form>
      </div>
    </ThemeProvider>
  );
}
