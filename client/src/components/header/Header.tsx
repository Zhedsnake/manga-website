import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";

import "../../css/Header.css";

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import WelcomeBlock from './WelcomeBlock';

function Header() {
  const { state, logIn, register, logOut, message } = useAuth();

  // Состояние авторизован ли пользователь для переключения форм логина и регистрации
  const [isLogin, setIsLogin] = useState(false);
  
  // Состояния для отслеживания фокуса на инпутах
  const [isLoginInputFocused, setIsLoginInputFocused] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

  // Состояние для поискового запроса  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Проверяем, зарегистрирован ли пользователь
    if (state.isAuthenticated) {
      setIsLogin(true);
    }
  }, [state.isAuthenticated]);

  const handleLogin = async (loginData: { login: string, password: string }) => {
    try {
      await logIn(loginData.login, loginData.password);
      setIsLogin(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (registerData: { login: string, password: string }) => {
    try {
      console.log("Регистрация")
      await register(registerData.login, registerData.password);
      setIsLogin(true);
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
            <RegisterForm
              handleRegister={handleRegister}
              isLoginInputFocused={isLoginInputFocused}
              setIsLoginInputFocused={setIsLoginInputFocused}
              isPasswordInputFocused={isPasswordInputFocused}
              setIsPasswordInputFocused={setIsPasswordInputFocused}
              maxLength={14}
            />
          ) : (
            <LoginForm
              handleLogin={handleLogin}
              isLoginInputFocused={isLoginInputFocused}
              setIsLoginInputFocused={setIsLoginInputFocused}
              isPasswordInputFocused={isPasswordInputFocused}
              setIsPasswordInputFocused={setIsPasswordInputFocused}
              maxLength={14}
            />
          )}

          <div className="home-line"></div>

          {/* Получене сообщения ошибки */}
          {message && <p className="message">{message}</p>}

          {!state.isAuthenticated && (
            <button 
              onClick={() => setIsLogin(!isLogin)}
              type="button" className="header__switch-button">
              {isLogin ? "Switch to Login" : "Switch to Register"}
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