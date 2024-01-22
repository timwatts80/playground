import React, { useState } from 'react';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!firstName) {
      errors.firstName = 'First name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (Object.keys(errors).length === 0) {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const data = await response.json();
      console.log(data);
    } else {
      setErrors(errors);
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = {};
    if (!value) {
      error[name] = `${name} is required`;
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error[name] = 'Email is invalid';
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...error }));
    if (errors[name] && !error[name]) {
      const { [name]: removedError, ...rest } = errors;
      setErrors(rest);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            onBlur={handleBlur}
          />
        </label>
        {errors.firstName && <div className="error">{errors.firstName}</div>}
        <br />
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            onBlur={handleBlur}
          />
        </label>
        {errors.lastName && <div className="error">{errors.lastName}</div>}
        <br />
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={handleBlur}
          />
        </label>
        {errors.email && <div className="error">{errors.email}</div>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;