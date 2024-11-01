import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/finnplayLogo.svg';
import styles from './NavBar.module.scss';

const NavBar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={styles.navBar}>
      <img src={logo} className={styles.logo} />
      <button onClick={() => handleLogout()} className={styles.logoutButton}>
        <i className="fa-regular fa-user" />
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
