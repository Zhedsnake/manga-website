import { useContext } from 'react';
import AuthContext from '../contexts/FirebaseAuthContext';


// Создаем пользовательский хук useAuth, который возвращает данные из контекста аутентификации.
const useAuth = function() {
const authContext = useContext(AuthContext);

return authContext;
};

export default useAuth;