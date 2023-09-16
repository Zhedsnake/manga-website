import { useContext } from 'react';
import AuthContext from '../contexts/FirebaseAuthContext';


// Определение начального состояния
interface AuthState {
  isAuthenticated: boolean;
  user: null | { [key: string]: any };
}

// Определяем пользовательский хук useAuth
const useAuth = function(): AuthState {
  // Используем хук useContext для получения данных из контекста AuthContext
  const { state } = useContext(AuthContext);

  // Возвращаем только состояние аутентификации
  return state;
};

export default useAuth;
