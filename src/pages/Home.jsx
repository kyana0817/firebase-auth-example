import { useNavigate } from 'react-router-dom';

import { useAuth } from '../utils/Authentication'
import { logout } from '../lib/auth'

export const Home = () => {
  const navigation = useNavigate();
  const {dispatch} = useAuth();
  
  const handleClick = async () => {
    try {
      await logout();
      dispatch({type: 'logout'})
      navigation('/login')
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <h1>Home</h1>
      <p>Private page</p>
      <div>
        <button onClick={handleClick}>logout</button>
      </div>
    </>
  )
}