// https://felixgerschau.com/react-hooks-form-validation-typescript/

import React, { useState } from "react";
import { ValidationError, Validations } from "../models/validation";

// <T extends Record<keyof T, any> = {}> means that useForm expects an object that has
// same keys as type T, with any values. If no generic was passed then fall back to empty
// object, i.e. any objects that will be deferred later on ???

const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [formData, setFormData] = useState<T>(
    (options?.initialValues || {}) as T,
  );

  const [errors, setErrors] = useState<ValidationError<T>>({});
  // Needs to extend unknown so we can add a generic to an arrow function
  const handleChange =
    <S extends unknown>(key: keyof T, sanitizerFn?: (value: string) => S) =>
    (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const value = sanitizerFn ? sanitizerFn(e.target.value) : e.target.value;
      // append new key-value pair
      setFormData({
        ...formData,
        [key]: value,
      });
      delete errors[key];
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validations = options?.validations;
    if (validations) {
      let isFormValid = true;
      setErrors({});
      const newErrors: ValidationError<T> = {};
      (Object.keys(validations) as (keyof T)[]).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(validations, key)) {
          const value = formData[key];
          const validation = validations[key];
          const pattern = validation?.pattern;
          const custom = validation?.custom;

          if (validation?.required?.value && !value) {
            isFormValid = false;
            newErrors[key] = validation?.required?.errorMessage;
          }

          if (pattern?.value && !RegExp(pattern.value).test(value)) {
            console.log(pattern.value);
            isFormValid = false;
            newErrors[key] = pattern.errorMessage;
          }

          if (custom?.isValid && !custom.isValid(value)) {
            isFormValid = false;
            newErrors[key] = custom.errorMessage;
          }
        }
      });

      if (!isFormValid) {
        setErrors(newErrors);
        // prevent onSubmit's handler firing
        return;
      }
    }

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errors,
  };
};

export default useForm;
