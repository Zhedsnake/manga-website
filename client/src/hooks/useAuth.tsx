import { useContext } from 'react';
import AuthContext from '../contexts/FirebaseAuthContext';


const useAuth = () => useContext(AuthContext);

export default useAuth;
