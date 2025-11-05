import styles from './Navbar.module.scss';
import {Link} from 'react-router-dom';
import Hacked from '@components/animations/hacked';

const Navbar = () => {
    return (
        <nav className={styles.container}>
            <Link to="/"><Hacked speed={90} text="Home"/></Link>
            <Link to="/examples"><Hacked speed={90} text="Examples"/></Link>
            <Link to="/starting"><Hacked speed={90} text="Starting"/></Link>
        </nav>
    )
}

export default Navbar