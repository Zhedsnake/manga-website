import React, { useState, useEffect } from 'react';
import useAuth from "./hooks/useAuth";
import "./css/Header.css";


export function Header() {
  const { state, logIn, register, logOut } = useAuth();

  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [registerData, setRegisterData] = useState({ login: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);

  // Состояния для отслеживания фокуса на инпутах
  const [isLoginInputFocused, setIsLoginInputFocused] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    // Проверяем, зарегистрирован ли пользователь
    if (state.isAuthenticated) {
      setIsLogin(false);
    }
  }, [state.isAuthenticated]);

  const handleLogin = async () => {
    try {
      await logIn(loginData.login, loginData.password);
      // Успешный вход, скрываем форму
      setIsLogin(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {

    try {
      await register(registerData.login, registerData.password);
      // Успешная регистрация, скрываем форму
      setIsLogin(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="header">
      <div className="container">
        {state.isAuthenticated ? (
          <div>
            <p>Welcome, {state.user && state.user.login}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : isLogin ? (
          <div>
            <input
              type="text"
              placeholder={isLoginInputFocused ? "" : "Login"}
              value={loginData.login}
              onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
              
              onFocus={() => setIsLoginInputFocused(true)}
              onBlur={() => setIsLoginInputFocused(false)}
            />
            <input
              type="password"
              placeholder={isPasswordInputFocused ? "" : "Password"}
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}

              onFocus={() => setIsPasswordInputFocused(true)}
              onBlur={() => setIsPasswordInputFocused(false)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder={isLoginInputFocused ? "" : "Register Login"}
              value={registerData.login}
              onChange={(e) => setRegisterData({ ...registerData, login: e.target.value })}

              onFocus={() => setIsLoginInputFocused(true)}
              onBlur={() => setIsLoginInputFocused(false)}
            />
            <input
              type="password"
              placeholder={isPasswordInputFocused ? "" : "Register Password"}
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}

              onFocus={() => setIsPasswordInputFocused(true)}
              onBlur={() => setIsPasswordInputFocused(false)}
            />
            <button onClick={handleRegister}>Register</button>
          </div>
        )}

        {!state.isAuthenticated && (
          <button onClick={toggleForm}>
            {isLogin ? "Switch to Register" : "Switch to Login"}
          </button>
        )}
      </div>
    </div>
  );
}