import { useState, Dispatch, SetStateAction } from 'react';

interface LoginFormProps {
  handleLogin: (loginData: { login: string; password: string }) => Promise<void>;
  isLoginInputFocused: boolean;
  setIsLoginInputFocused: Dispatch<SetStateAction<boolean>>;
  isPasswordInputFocused: boolean;
  setIsPasswordInputFocused: Dispatch<SetStateAction<boolean>>;
  maxLength: number;
}

function LoginForm({
  handleLogin,
  isLoginInputFocused,
  setIsLoginInputFocused,
  isPasswordInputFocused,
  setIsPasswordInputFocused,
  maxLength,
}: LoginFormProps) {
  const [loginData, setLoginData] = useState({ login: "", password: "" });

  return (    
    <div className="header__login-form">
      <input
        type="text"
        placeholder={isLoginInputFocused ? "" : "Login"}
        value={loginData.login}
        onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
        onFocus={() => setIsLoginInputFocused(true)}
        onBlur={() => setIsLoginInputFocused(false)}
        maxLength={maxLength}
        className='header__input'
      />
      <input
        type="password"
        placeholder={isPasswordInputFocused ? "" : "Password"}
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        onFocus={() => setIsPasswordInputFocused(true)}
        onBlur={() => setIsPasswordInputFocused(false)}
        maxLength={maxLength}
        className='header__input'
      />
      <button type="button" className="header__auth-button" onClick={() => handleLogin(loginData)}>Login</button>
    </div>
  );
}

export default LoginForm;
