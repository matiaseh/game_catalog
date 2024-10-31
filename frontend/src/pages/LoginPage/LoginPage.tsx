import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import logo from '../../assets/finnplayLogo.svg';

const LoginForm: React.FC = () => {
  const { login, error, isLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/player');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(username, password);
  };

  return (
    <div className={styles.loginContainer}>
      <img src={logo} />
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.inputFields}>
          <div className={styles.inputField}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputField}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
