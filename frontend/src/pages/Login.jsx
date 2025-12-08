import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);

      // Save token + user + role
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('role', res.data.user.role);   // ⭐ IMPORTANT

      // Redirect correctly based on role
      if (res.data.user.role === "admin") {
        navigate('/admin/dashboard');  // ⭐ Correct admin redirect
      } else {
        navigate('/dashboard');        // ⭐ Student redirect
      }

    } catch (err) {
      setMsg(err?.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div>
      <div className='header'>
        <div className='font-semibold'>Login</div>
      </div>

      <div className='container'>
        <div className='card max-w-md mx-auto'>

          <form onSubmit={submit}>
            <input
              className='input'
              placeholder='Email'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              className='input'
              type='password'
              placeholder='Password'
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button className='btn' type='submit'>Login</button>
          </form>

          <p className='text-sm text-red-600 mt-2'>{msg}</p>

        </div>
      </div>
    </div>
  );
}
