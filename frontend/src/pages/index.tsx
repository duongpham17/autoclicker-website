import styles from './Pages.module.scss'
import {Routes, Route} from 'react-router-dom';

import Private from './Private';
import Home from './home';
import Policy from './policy';
import Cookies from './cookies';
import Privacy from './privacy';
import Login from './login';
import Credit from './credit';
import CreditSuccess from './credit/success';

const Pages = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/policy" element={<Policy/>} />
        <Route path="/cookies" element={<Cookies/>} />
        <Route path="/privacy" element={<Privacy/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/credit" element={<Private component={Credit} roles={["admin","user"]}/> } />
        <Route path="/credit/success" element={<Private component={CreditSuccess} roles={["admin","user"]}/> } />
      </Routes>
    </div>
  )
};

export default Pages;