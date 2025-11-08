import styles from './Home.module.scss';
import { Fragment } from 'react';
import { useAppSelector } from '@redux/hooks/useRedux';
import { Link } from 'react-router-dom';
import Hacked from '@components/animations/Hacked';
import { FaApple, FaWindows } from "react-icons/fa";

const Home = () => {

  const {user} = useAppSelector(state => state.authentications);

  return (
    <div className={styles.container}>

      <section className={styles.image} id="image">
        <img src="/logo.png" alt="logo"/>
      </section>

      <section className={styles.credits} id="credits">
        <div>
          {user 
            ? 
            <Fragment>
              <h1><Hacked text="Want more scripts?"/></h1>
              <Link to="/credit"><Hacked text="You can buy more credits here."/></Link>
            </Fragment>
            :
              <Fragment>
              <Link to="/login"><Hacked text="Login or create an account."/></Link>
            </Fragment>
          }
        </div>
      </section>

      <section className={styles.downloads} id="download">
        <div>
          <h1><Hacked text="Downloads"/></h1>
          <button><FaApple/></button>
          <button><FaWindows/></button>
        </div>
      </section>

    </div>
  )
}

export default Home