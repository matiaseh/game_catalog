import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/finnplayLogo.svg';
import styles from './NavBar.module.scss';
import useIsMobile from '../../hooks/useIsMobile';

const NavBar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const isMobile = useIsMobile();

  return (
    <nav className={`${styles.navBar} ${isMobile ? styles.mobile : ''}`}>
      <img src={logo} className={styles.logo} />
      <button onClick={() => handleLogout()} className={styles.logoutButton}>
        <i className="fa-regular fa-user" />
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
