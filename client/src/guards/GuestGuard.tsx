//Компонент guest guard переводит незалогиненного пользователя к логину и оборачивается вокруг защищенных страниц.

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Определение типа для компонента GuestGuardProps
type GuestGuardProps = {
  children: React.ReactNode;
};


// Принимает `children` в качестве аргумента и проверяет аутентификацию пользователя.
// Если пользователь не аутентифицирован, перенаправляет на страницу '/login', иначе отображает дочерние компоненты.
const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Проверяем, аутентифицирован ли пользователь
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default GuestGuard;

{/* <GuestGuard>
  <PostReview />
</GuestGuard> */}