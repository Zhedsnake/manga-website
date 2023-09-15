import { useContext } from 'react';
import AuthContext from '../contexts/FirebaseAuthContext';

// Определение типа для состояния аутентификации
type AuthContextState = {
  isAuthenticated: boolean;
};

// Создаем пользовательский хук useAuth, который возвращает данные из контекста аутентификации.
const useAuth = function(): AuthContextState {
    const authContext = useContext(AuthContext);

    return {
      isAuthenticated: authContext.isAuthenticated,
      // Другие свойства, если есть
    };
};

export default useAuth;