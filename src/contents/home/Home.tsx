import styles from './Home.module.scss';
import Animation from 'components/animation/Animation';

import Logo from './logo/Logo';
import Download from './download/Download';
import Github from './github/Github';
 
const Home = () => {
  return (
      <Animation>
      <div className={styles.container}>

        <b>Autoclickers is open source and free to use</b>

        <section>
          <Logo />
        </section>

        <section>
          <Download />
        </section>

        <section>
          <Github />
        </section>

    </div>
    </Animation>
  )
}

export default Home