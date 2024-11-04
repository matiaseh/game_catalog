import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import logo from '../../assets/finnplayLogo.svg';
import InputField from '../../components/InputField/InputField';

const LoginForm = () => {
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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.loginContainer}>
      <img src={logo} />
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.inputFields}>
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <InputField
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            iconName={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onIconClick={() => setShowPassword(!showPassword)}
            required
          />
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
