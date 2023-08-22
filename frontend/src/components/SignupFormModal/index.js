import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import './SignupForm.css'

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disableButton, setDisableButton] = useState(true)
  const { closeModal } = useModal()

  useEffect(() => {
    if (
        firstName && lastName && email &&
        username && password && confirmPassword &&
        username.length > 3 &&
        password.length > 5 &&
        password === confirmPassword) {
          setDisableButton(false)
    } else setDisableButton(true)
}, [firstName, lastName, email, username, password, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        }))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              console.log(data)
            setErrors(data.errors);
            }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='signup-input'
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}
        <input
          className='signup-input'
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <p className="error-msg">{errors.username}</p>}
        <input
          className='signup-input'
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.firstName && <p className="error-msg">{errors.firstName}</p>}
        <input
          className='signup-input'
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName && <p className="error-msg">{errors.lastName}</p>}
        <input
          className='signup-input'
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}
        <input
          className='signup-input'
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
        <button className="form-submit" type="submit" disabled={disableButton}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
