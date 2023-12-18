import useAuth from "../../hooks/useAuth";

interface WelcomeBlockProps {
  user: { login: string } | null;
  handleLogout: () => void;
}

function WelcomeBlock({ user, handleLogout }: WelcomeBlockProps) {
  const { state } = useAuth();

  return (  
    <div className="header__authorised-user-container">
        <div className="header__welcome">
          <p>Welcome, {state.user && state.user.login}</p>
        </div>
        <button type="button" className="header__auth-button" onClick={handleLogout}>Logout</button>
    </div>    
  );
}

export default WelcomeBlock;
