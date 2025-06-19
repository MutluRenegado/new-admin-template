'use client';

import { useState } from 'react';
import { loginUser, loginWithGoogle } from '@/lib/firebase/auth';

export default function NewLoginTemplate() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      setError('');
      alert('Logged in successfully!');
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setError('');
      alert('Logged in with Google!');
    } catch (err: any) {
      setError(err.message || 'Google login failed.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Firebase Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>

      <button onClick={handleGoogleLogin} style={{ ...styles.button, background: '#4285F4' }}>
        Login with Google
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '400px',
    margin: '5rem auto',
    padding: '2rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    background: '#fff',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    background: '#0070f3',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
};
