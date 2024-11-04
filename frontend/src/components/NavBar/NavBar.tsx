import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/finnplayLogo.svg';
import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={styles.navBar}>
      <img src={logo} className={styles.logo} />
      <div className={styles.menuIcon} onClick={toggleDropdown}>
        <i className="fa-solid fa-bars" />
      </div>
      <ul className={`${styles.navList} ${isDropdownOpen ? styles.show : ''}`}>
        <li>
          <Link to="/player" onClick={() => setIsDropdownOpen(false)}>
            Player
          </Link>
        </li>
        <li>
          <Link to="/groups" onClick={() => setIsDropdownOpen(false)}>
            Groups
          </Link>
        </li>
      </ul>
      <button onClick={() => handleLogout()} className={styles.logoutButton}>
        <i className="fa-regular fa-user" />
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
