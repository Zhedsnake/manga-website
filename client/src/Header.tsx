import React, { useState, useEffect } from 'react';
import useAuth from "./hooks/useAuth";

import "./css/Header.css";

import LoginForm from './components/header/LoginForm';
import RegisterForm from './components/header/RegisterForm';
import WelcomeBlock from './components/header/WelcomeBlock';

function Header() {
  const { state, logIn, register, logOut, message } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  
  // Состояния для отслеживания фокуса на инпутах
  const [isLoginInputFocused, setIsLoginInputFocused] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

  // Состояние для поискового запроса  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Проверяем, зарегистрирован ли пользователь
    if (state.isAuthenticated) {
      setIsLogin(false);
    }
  }, [state.isAuthenticated]);
  const handleLogin = async (loginData: { login: string, password: string }) => {
    try {
      await logIn(loginData.login, loginData.password);
      // Успешный вход, скрываем форму
      setIsLogin(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (registerData: { login: string, password: string }) => {
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

  const handleSearch = () => {
    // Добавьте логику обработки поискового запроса здесь
    console.log("Search query:", searchQuery);
    // Очистите инпут после выполнения поиска, если это необходимо
    setSearchQuery("");
  };

  return (
    <header className="header">
        <div className="header__user-operation">
          {state.isAuthenticated ? (
            <WelcomeBlock 
              user={state.user && state.user.login} 
              handleLogout={handleLogout} 
            />
          ) : isLogin ? (
            <LoginForm
              handleLogin={handleLogin}
              isLoginInputFocused={isLoginInputFocused}
              setIsLoginInputFocused={setIsLoginInputFocused}
              isPasswordInputFocused={isPasswordInputFocused}
              setIsPasswordInputFocused={setIsPasswordInputFocused}
              maxLength={14}
            />
          ) : (
            <RegisterForm
              handleRegister={handleRegister}
              isLoginInputFocused={isLoginInputFocused}
              setIsLoginInputFocused={setIsLoginInputFocused}
              isPasswordInputFocused={isPasswordInputFocused}
              setIsPasswordInputFocused={setIsPasswordInputFocused}
              maxLength={14}
            />
          )}

          <div className="home-line"></div>

          {/* Вывод сообщения */}
          {message && <p className="message">{message}</p>}

          {!state.isAuthenticated && (
            <button 
              onClick={() => setIsLogin(!isLogin)}
              type="button" className="header__switch-button">
              {isLogin ? "Switch to Register" : "Switch to Login"}
            </button>
          )}
        </div>
        <div className="header__search-bar">
          <div className="header__wave">
            <div className="header__hide-wave"></div>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="header__search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="button" 
            className="header__search-button" 
            onClick={handleSearch}
            ></button>
        </div>
    </header>
  );
}

export default Header;