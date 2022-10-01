export type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export interface Validation {
  required?: {
    value: boolean;
    errorMessage: string;
  };
  pattern?: {
    value: string;
    errorMessage: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    errorMessage: string;
  };
}

export type ValidationError<T> = Partial<Record<keyof T, string>>;
