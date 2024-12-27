import { render, fireEvent, waitFor } from '@testing-library/react';
import { useState } from 'react';
import useFormValidator, { ValidationRules } from '../src/useFormValidator';

const mockCallback = jest.fn();

const TestComponent = ({ initialValues, validationRules }: { initialValues: Record<string, string>, validationRules: ValidationRules }) => {
  const { values, errors, handleChange, handleSubmit, passwordStrength } = useFormValidator(initialValues, validationRules);

  return (
    <form onSubmit={handleSubmit(mockCallback)}>
      <input
        type="text"
        name="email"
        value={values.email || ''}
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}
      <input
        type="password"
        name="password"
        value={values.password || ''}
        onChange={handleChange}
      />
      {errors.password && <span>{errors.password}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};

describe('useFormValidator', () => {
  const validationRules: ValidationRules = {
    email: {
      required: true,
      type: 'email',
    },
    password: {
      required: true,
      minLength: 8,
      passwordStrength: 50,
    },
  };

  it('should render and handle email validation', async () => {
    const { getByRole, getByText } = render(
      <TestComponent initialValues={{ email: '', password: '' }} validationRules={validationRules} />
    );

    const emailInput = getByRole('textbox', { name: /email/i });
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    await waitFor(() => getByText(/please enter a valid email address/i));

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(getByText('')).toBeEmptyDOMElement();
  });

  it('should handle password validation with strength', async () => {
    const { getByRole, getByText } = render(
      <TestComponent initialValues={{ email: '', password: '' }} validationRules={validationRules} />
    );

    const passwordInput = getByRole('textbox', { name: /password/i });
    fireEvent.change(passwordInput, { target: { value: 'weakpass' } });

    await waitFor(() => getByText(/password strength must be at least 50/i));

    fireEvent.change(passwordInput, { target: { value: 'Str0ngP@ssw0rd' } });

    expect(getByText('')).toBeEmptyDOMElement();
  });

  it('should submit the form if there are no errors', async () => {
    const { getByRole } = render(
      <TestComponent initialValues={{ email: 'test@example.com', password: 'Str0ngP@ssw0rd' }} validationRules={validationRules} />
    );

    const submitButton = getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockCallback).toHaveBeenCalled());
  });
});
