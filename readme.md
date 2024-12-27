# Robinson Form Validator

A lightweight and customizable form validation library to simplify form handling in both JavaScript and TypeScript.

[GitHub Link](https://github.com/ikwerre-dev/Form-Validator-Library.git)

[NPM Link](https://www.npmjs.com/package/robinson-form-validator?activeTab=readme)


## Features

- Simple API for validating form fields
- Support for custom validation rules
- Easy to use with both JavaScript and TypeScript
- Minimal dependencies and optimized for performance


## Installation

You can install the package using npm:

```bash
npm install robinson-form-validator
```

## Usage

# Javascript Installation & Example:

```javascript

import useFormValidator from 'robinson-form-validator';

function App() {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 8,
    },
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useFormValidator(initialValues, validationRules);

  const onSubmit = handleSubmit(() => {
    console.log('Form submitted', values);
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default App;



```

# Typescript Installation & Example:

```typescript
import { useFormValidator } from 'robinson-form-validator';

interface FormValues {
  email: string;
  password: string;
}

function MyForm() {
  const { handleChange, handleSubmit, errors } = useFormValidator<FormValues>({
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
    password: {
      required: true,
      minLength: 8,
      message: 'Password must be at least 8 characters long',
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(() => {
      // Your form submit logic here
      console.log('Form submitted');
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Enter your email"
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Enter your password"
      />
      {errors.password && <span>{errors.password}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}

```


# API

## useFormValidator(config: ValidationConfig)

The `useFormValidator` hook accepts a config object where you define the validation rules for your form fields. It returns an object containing the following:

- `handleChange`: A function to handle changes to form inputs.
- `handleSubmit`: A function to handle form submission.
- `errors`: An object containing validation error messages for each field.

## ValidationConfig

The `ValidationConfig` object defines validation rules for each field. A field can have the following properties:

- `required`: Boolean, specifies whether the field is required.
- `minLength`: Number, the minimum length of the field value.
- `maxLength`: Number, the maximum length of the field value.
- `pattern`: A regular expression to match the value.
- `message`: Custom error message to display when validation fails.


# Example:

```typescript
interface ValidationConfig {
  [fieldName: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
  };
}

```

# Contributing

Feel free to fork this repository and submit pull requests if you would like to contribute. We welcome bug reports and feature requests as well!

# License

This project is licensed under the MIT License - see the LICENSE file for details.

