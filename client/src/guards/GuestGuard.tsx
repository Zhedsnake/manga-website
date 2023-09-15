//Компонент guest guard переводит незалогиненного пользователя к логину и оборачивается вокруг защищенных страниц.

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Определение типа для компонента GuestGuardProps
type GuestGuardProps = {
  children: React.ReactNode;
};

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