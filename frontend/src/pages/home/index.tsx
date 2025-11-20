import styles from './Home.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dmg_github_links } from 'environment';
import { FaWindows, FaGithub, FaApple } from "react-icons/fa";
import Container from '@components/containers/Style1';
import Text from '@components/texts/Style1';

const Home = () => {

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

      <header id="image">
        <Link to="/examples"><img src="/logo512.png" alt="logo"/></Link>
      </header>
      
      <Container>
        <section>
          <Text size={16}>Create custom autoclickers, automate repetitive tasks, and boost productivity—whether for gaming, testing, or everyday routines. Fast, simple, and efficient.</Text>
        </section>
      </Container>

      <Container>
        <section>
          <Text size={20}>Github</Text>
          <Link to="https://github.com/duongpham17/autoclicker-application-window"><FaGithub/></Link>
        </section> 
      </Container>

      <Container>
        <section className={styles.downloads} id="download">
          <Text size={20}>Download for Windows</Text>
          <button className={loading ? styles.loading : ""} onClick={() => onDownload(dmg_github_links.win)} disabled={loading}><FaWindows/></button>
        </section>
      </Container>

      <Container>
        <section className={styles.downloads} id="download">
          <Text color="light" size={20}>Download for Mac ( Coming soon )</Text>
          <button className={loading ? styles.loading : ""} disabled={loading}><FaApple/></button>
        </section>
      </Container>

    </div>
  )
}

export default Home