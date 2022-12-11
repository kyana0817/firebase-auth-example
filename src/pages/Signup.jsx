import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { signup } from '../lib/auth'
import { useAuth } from '../utils/Authentication'

export const Signup = () => {
  const navigation = useNavigate();
  const {dispatch} = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
    password_confirm: ''
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.email, form.password);
      dispatch({type: 'login'});
      navigation('/');
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>email</p>
          <input type="email" name="email" value={form.email} onChange={handleChange}/>
        </label>
        <label>
          <p>password</p>
          <input type="password" name="password" value={form.password} onChange={handleChange}/>
        </label>
        <label>
          <p>confirm password</p>
          <input type="password" name="password_confirm" value={form.password_confirm} onChange={handleChange}/>
        </label>
        <div>
          <button>
            submit
          </button>
        </div>
        <Link to="/login">
          login
        </Link>
      </form>
    </>
  )
}