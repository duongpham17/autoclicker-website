import styles from './Home.module.scss';
import { Fragment, useState } from 'react';
import { useAppSelector } from '@redux/hooks/useRedux';
import { Link } from 'react-router-dom';
import { dmg_github_links } from 'environment';
import { FaApple, FaWindows } from "react-icons/fa";
import Hacked from '@components/animations/Hacked';

const Home = () => {

  const {user} = useAppSelector(state => state.authentications);

  const [loading, setLoading] = useState(false);

  const onDownload = async (link: string) => {
    setLoading(true);
    const a = document.createElement("a");
    a.href = link;
    a.download = "autoclicker.dmg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setLoading(false), 5000)
  };

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
          <div>
            {/* <button 
              className={loading ? styles.loading : ""} 
              onClick={() => onDownload(dmg_github_links.mac)} 
              disabled={loading}>
                <FaApple/>
            </button> */}
            <button 
              className={loading ? styles.loading : ""} 
              onClick={() => onDownload(dmg_github_links.win)} 
              disabled={loading}>
                <FaWindows/>
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home