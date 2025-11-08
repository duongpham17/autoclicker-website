import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks/useRedux';
import { user_authentication } from '@localstorage';
import Hacked from '@components/animations/Hacked';

const Navbar = () => {

    const {user} = useAppSelector(state => state.authentications);

    const onLogout = () => {
        window.location.reload();
        user_authentication.remove();
    };

    return (
        <nav className={styles.container}>
            <div>
                <Link to="/"><Hacked speed={90} text="Home"/></Link>
                <Link to="/examples"><Hacked speed={90} text="Examples"/></Link>
                <Link to="/starting"><Hacked speed={90} text="Starting"/></Link>
            </div>
            <div>
                {!user && <Link to="/login"><Hacked speed={90} text="Login"/></Link>}
                {user && <Link to="/credit"><Hacked speed={90} text={`Credit: ${user.credit}`}/></Link>}
                {user && <button onClick={onLogout}><Hacked speed={90} text="Logout"/></button>}
            </div>
        </nav>
    )
}

export default Navbar