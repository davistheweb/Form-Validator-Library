import { useState } from 'react';

type ValidatorFunction = (value: string, allValues?: Record<string, string>) => string | null;

type ValidationRule = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: ValidatorFunction | ValidatorFunction[];
  async?: (value: string, allValues?: Record<string, string>) => Promise<string | null>;
};

export type ValidationRules = Record<string, ValidationRule>;

const useFormValidator = (initialValues: Record<string, string>, validationRules: ValidationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = async (field: string, value: string) => {
    const rule = validationRules[field];
    if (!rule) return null;

    if (rule.required && !value.trim()) return `${field} is required`;
    if (rule.pattern && !rule.pattern.test(value)) return `${field} is invalid`;
    if (rule.minLength && value.length < rule.minLength) return `${field} must be at least ${rule.minLength} characters`;
    if (rule.maxLength && value.length > rule.maxLength) return `${field} must be no more than ${rule.maxLength} characters`;

    if (rule.custom) {
      const customRules = Array.isArray(rule.custom) ? rule.custom : [rule.custom];
      for (const customRule of customRules) {
        const error = customRule(value, values);
        if (error) return error;
      }
    }

    if (rule.async) {
      const asyncError = await rule.async(value, values);
      if (asyncError) return asyncError;
    }

    return null;
  };

  const validate = async (fieldValues = values) => {
    const tempErrors: Record<string, string> = {};

    for (const field in validationRules) {
      const error = await validateField(field, fieldValues[field]);
      if (error) tempErrors[field] = error;
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    const error = await validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error || '' }));
  };

  const handleSubmit = (callback: () => void) => async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = await validate();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      callback();
    }
  };

  return { values, errors, handleChange, handleSubmit, isSubmitting };
};

export default useFormValidator;
