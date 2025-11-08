import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import Hacked from '@components/animations/Hacked';

const Footer = () => {
  return (
    <footer className={styles.container}>
        <Link to="/policy"><Hacked text="Policy" /></Link>
        <Link to="/privacy"><Hacked text="Privacy" /></Link>
        <Link to="/cookies"><Hacked text="Cookies" /></Link>
    </footer>
  )
}

export default Footer