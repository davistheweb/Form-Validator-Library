# Robinson Form Validator

A lightweight and customizable form validation library to simplify form handling in both JavaScript and TypeScript.

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

# Javascript Installation:

```javascript

import { useFormValidator } from 'robinson-form-validator';

function MyForm() {
  const { handleChange, handleSubmit, errors } = useFormValidator({
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

  const onSubmit = (e) => {
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

