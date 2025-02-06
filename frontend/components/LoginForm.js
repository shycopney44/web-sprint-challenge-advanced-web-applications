import React, { useState } from 'react';
import PT from 'prop-types';

const initialFormValues = {
  username: '',
  password: '',
};

export default function LoginForm({ login }) {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const onChange = evt => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
    setErrors({ ...errors, [id]: '' }); // Clear the error message for the current input
  };

  const onSubmit = evt => {
    evt.preventDefault();
    if (isDisabled()) {
      setErrors({
        username: values.username.trim().length < 3 ? 'Username must be at least 3 characters' : '',
        password: values.password.trim().length < 8 ? 'Password must be at least 8 characters' : '',
      });
      return;
    }
    login(values);
  };

  const isDisabled = () => {
    const trimmedUsername = values.username.trim();
    const trimmedPassword = values.password.trim();
    return trimmedUsername.length < 3 || trimmedPassword.length < 8;
  };

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        autoFocus
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      {errors.username && <p>{errors.username}</p>}
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      {errors.password && <p>{errors.password}</p>}
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  );
}

LoginForm.propTypes = {
  login: PT.func.isRequired,
};
