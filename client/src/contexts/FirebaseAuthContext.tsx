import { useState, createContext, useEffect, useReducer, ReactNode } from 'react';
import axios from 'axios';


import { API_URL } from '../api/config';


// Определение начального состояния
interface AuthState {
  isAuthenticated: boolean;
  user: null | { [key: string]: any };
  message: string;
}

// Определение действий (actions) для редуктора
type AuthAction =
  | { type: 'LOGIN'; payload: { user: { [key: string]: any } } }
  | { type: 'LOGOUT' };
  
// Создание контекста аутентификации
interface AuthContextProps {
  children: ReactNode;
}




// Начальное состояние
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  message: '',
};

// Редуктор
const authReducer = function(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};


export const AuthContext = createContext<{
  state: AuthState;
  logIn: (login: string, password: string) => Promise<void>;
  register: (login: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  message: string;
}>({
  state: initialState,
  logIn: async () => {},
  register: async () => {},
  logOut: async () => {},
  message: '',
});


// Компонент провайдера аутентификации
export const AuthProvider: React.FC<AuthContextProps> = function({ children }) {
  // Инициализация редуктора
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [message, setMessage] = useState<string>(''); // Состояние для сообщения

  // Функция для получения информации о пользователе
  const getUserInfo = async function() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Установка заголовка перед запросом
        axios.defaults.headers.common['x-auth-token'] = token;
        const res = await axios.get(`${API_URL}/user/info`);

        dispatch({
          type: 'LOGIN',
          payload: {
            user: res.data.user,
          },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  // Проверка пользователя при инициализации и изменении состояния редуктора
  useEffect(function() {
    if (!state.user) {
      getUserInfo();
    }
  }, [state]);

  // Функция для входа
  const logIn = async function(login: string, password: string) {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({ login, password });

    try {
      const res = await axios.post(`${API_URL}/user/login`, body, config);
      localStorage.setItem('token', res.data.token);
      await getUserInfo();
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  // Функция для регистрации
  const register = async function(login: string, password: string) {
    
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({ login, password });
    
    try {
      const res = await axios.post(`${API_URL}/user/register`, body, config);
      localStorage.setItem('token', res.data.token);
      await getUserInfo();
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  // Функция для выхода
  const logOut = async function() {
    try {
      localStorage.removeItem('token');
      dispatch({
        type: 'LOGOUT',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ state, logIn, register, logOut, message }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;