import { useState } from 'react';

type ValidatorFunction = (value: string, allValues?: Record<string, string>) => string | null;

type ValidationRule = {
  type?: 'email' | 'password' | 'creditCard' | 'cvv' | 'phone' | 'date' | 'postalCode' | 'url' | 'numeric';
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: ValidatorFunction | ValidatorFunction[];
  async?: (value: string, allValues?: Record<string, string>) => Promise<string | null>;
  passwordStrength?: number; // 0-100
};

export type ValidationRules = Record<string, ValidationRule>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|2131|1800|35\d{3}[0-9]{11}|4[0-9]{15})$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const postalCodeRegex = /^[0-9]{5}(-[0-9]{4})?$/;
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
console.log('Robinson Honour is Cooking :)')
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (password.match(/[a-z]+/)) strength += 10;
  if (password.match(/[A-Z]+/)) strength += 15;
  if (password.match(/[0-9]+/)) strength += 25;
  if (password.match(/[$@#&!]+/)) strength += 25;
  return Math.min(strength, 100);
};


const useFormValidator = (initialValues: Record<string, string>, validationRules: ValidationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = async (field: string, value: string) => {
    const rule = validationRules[field];
    if (!rule) return null;

    if (rule.required && !value.trim()) return `${field} is required`;
    
    switch (rule.type) {
      case 'email':
        if (!emailRegex.test(value)) return `Please enter a valid email address`;
        break;
      case 'password':
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
        if (rule.passwordStrength && strength < rule.passwordStrength) {
          return `Password strength must be at least ${rule.passwordStrength}`;
        }
        break;
      case 'creditCard':
        const cleanedValue = value.replace(/\s/g, '');
        if (!creditCardRegex.test(cleanedValue)) {
          return 'Please enter a valid credit card number (Visa, MasterCard, American Express, Discover, or Verve - updated)';
        }
        break;
      case 'cvv':
        if (!/^\d{3,4}$/.test(value)) return 'CVV must be 3 or 4 digits';
        break;
      case 'phone':
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
        break;
      case 'date':
        if (!dateRegex.test(value)) return 'Please enter a valid date in YYYY-MM-DD format';
        break;
      case 'postalCode':
        if (!postalCodeRegex.test(value)) return 'Please enter a valid postal code';
        break;
      case 'url':
        if (!urlRegex.test(value)) return 'Please enter a valid URL';
        break;
      case 'numeric':
        if (isNaN(Number(value))) return 'Please enter a valid number';
        break;
    }
    
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

  return { values, errors, handleChange, handleSubmit, isSubmitting, passwordStrength };
};

export default useFormValidator;

