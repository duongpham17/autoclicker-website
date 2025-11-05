import styles from './Pages.module.scss'
import {Routes, Route} from 'react-router-dom';

import Home from './home';
import Policy from './policy';
import Cookies from './cookies';
import Privacy from './privacy';

const Pages = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/policy" element={<Policy/>} />
        <Route path="/cookies" element={<Cookies/>} />
        <Route path="/privacy" element={<Privacy/>} />
      </Routes>
    </div>
  )
};

export default Pages;