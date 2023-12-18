import { useState, ChangeEvent } from 'react';

interface RegisterFormProps {
  handleRegister: (registerData: { login: string; password: string }) => void;
  isLoginInputFocused: boolean;
  setIsLoginInputFocused: (focused: boolean) => void;
  isPasswordInputFocused: boolean;
  setIsPasswordInputFocused: (focused: boolean) => void;
  maxLength: number;
}

function RegisterForm({
  handleRegister,
  isLoginInputFocused,
  setIsLoginInputFocused,
  isPasswordInputFocused,
  setIsPasswordInputFocused,
  maxLength,
}: RegisterFormProps) {
  const [registerData, setRegisterData] = useState({ login: "", password: "" });

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, login: e.target.value });
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, password: e.target.value });
  };

  const handleLoginFocus = () => {
    setIsLoginInputFocused(true);
  };
  const handleLoginBlur = () => {
    setIsLoginInputFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordInputFocused(true);
  };
  const handlePasswordBlur = () => {
    setIsPasswordInputFocused(false);
  };

  return (
    <div className="header__login-form">
      <input
        type="text"
        placeholder={isLoginInputFocused ? "" : "Register Login"}
        value={registerData.login}
        onChange={handleLoginChange}
        onFocus={handleLoginFocus}
        onBlur={handleLoginBlur}
        maxLength={maxLength}
        className='header__input'
      />
      <input
        type="password"
        placeholder={isPasswordInputFocused ? "" : "Register Password"}
        value={registerData.password}
        onChange={handlePasswordChange}
        onFocus={handlePasswordFocus}
        onBlur={handlePasswordBlur}
        maxLength={maxLength}
        className='header__input'
      />
      <button type="button"  className="header__auth-button" onClick={() => handleRegister(registerData)}>Register</button>
    </div>
  );
}

export default RegisterForm;
