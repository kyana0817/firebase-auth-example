import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { AuthenticationProvider, Authoraization } from './utils/Authentication';

function App() {
  return (
    <AuthenticationProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Authoraization><Home/></Authoraization>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </AuthenticationProvider>
  );
}

export default App;
