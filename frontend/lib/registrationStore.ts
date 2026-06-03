import { create } from 'zustand';

export interface RegistrationData {
  // Step 1: Wallet Setup
  walletType: 'external' | 'embedded' | null;
  walletAddress: string;
  embeddedWalletSecret: string;
  embeddedWalletBackupConfirmed: boolean;
  // Step 2: Business Details
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
  bankAccountNumber?: string;
  bankRoutingNumber?: string;
}

export interface RegistrationState {
  currentStep: 1 | 2;
  formData: RegistrationData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  updateFormData: (data: Partial<RegistrationData>) => void;
  setErrors: (errors: Record<string, string>) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  submit: () => void;
}

const initialFormData: RegistrationData = {
  walletType: null,
  walletAddress: '',
  embeddedWalletSecret: '',
  embeddedWalletBackupConfirmed: false,
  businessName: '',
  email: '',
  password: '',
  confirmPassword: '',
  bankAccountNumber: '',
  bankRoutingNumber: '',
};

export const useRegistrationStore = create<RegistrationState>((set) => ({
  currentStep: 1,
  formData: initialFormData,
  errors: {},
  isSubmitting: false,
  updateFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
  },
  setErrors: (errors) => set({ errors }),
  nextStep: () => {
    set((state) => ({
      currentStep: state.currentStep === 1 ? 2 : 1,
    }));
  },
  prevStep: () => {
    set((state) => ({
      currentStep: state.currentStep === 2 ? 1 : 1,
    }));
  },
  reset: () => {
    set({
      currentStep: 1,
      formData: initialFormData,
      errors: {},
      isSubmitting: false,
    });
  },
  submit: () => {
    set((state) => {
      console.log('Registration submitted with data:', state.formData);
      return state;
    });
  },
}));
