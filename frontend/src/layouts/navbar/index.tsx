
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks/useRedux';
import { MdOutlinePerson, MdOutlineQuestionMark } from "react-icons/md";
import Flex from '@components/flex/Flex';
import Hover from '@components/hover/Style1';
import Theme from './theme';

const NavbarLayout = () => {

    const { user } = useAppSelector(state => state.authentications);

    return (
        <nav className={styles.container}>
            <Flex>
                <Hover message="Home">
                    <Link to="/"><img src={process.env.PUBLIC_URL + '/logo64.png'} alt="Logo" /></Link>
                </Hover>
            </Flex>
            { user 
            ?
                <Flex>
                    <Hover message="Examples"><Link to="/examples"><MdOutlineQuestionMark/></Link></Hover>
                    <Hover message="Credits"><Link to="/credit">{user.credit || 0}</Link></Hover>
                    <Hover message="Profile"><Link to="/profile"><MdOutlinePerson/></Link></Hover>
                    <Theme />
                </Flex>
            :
                <Flex>
                    <Hover message="Login"><Link to="/login"><MdOutlinePerson/></Link></Hover>
                    <Theme />
                </Flex>
            }
        </nav>
    )
}

export default NavbarLayout