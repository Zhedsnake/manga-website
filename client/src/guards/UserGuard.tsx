// Охранник пользователя переводит зарегистрированного пользователя на главную страницу и обводит страницы входа и регистрации.

const UserGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

{/* <UserGuard>
  <Login />
</UserGuard> */}