import styles from './Home.module.scss';
import React from 'react';

import Logo from './logo/Logo';
import Download from './download/Download';
import Github from './github/Github';
import About from './about/About';
import Contact from './contact/Contact';
 
const Home = () => {
  return (
    <div className={styles.container}>

      <section>
        <Logo />
      </section>

      <section>
        <Download />
        <Github />
      </section>

      <section>
        <About />
      </section>

      <section>
        <Contact />
      </section>

    </div>
  )
}

export default Home