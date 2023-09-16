// Охранник пользователя переводит зарегистрированного пользователя на главную страницу и обводит страницы входа и регистрации.

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Определение типа для компонента UserGuarddProps
type UserGuarddProps = {
  children: React.ReactNode;
};


// Принимает `children` в качестве аргумента и проверяет аутентификацию пользователя.
// Если пользователь аутентифицирован, перенаправляет на страницу '/dashboard', иначе отображает дочерние компоненты.
const UserGuard: React.FC<UserGuarddProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default UserGuard;


{/* <UserGuard>
  <Login />
</UserGuard> */}