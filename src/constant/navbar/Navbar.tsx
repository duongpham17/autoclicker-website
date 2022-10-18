import styles from './Navbar.module.scss';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {

  const {pathname} = useRouter();

  const onPathname = (name: string) => {
    return pathname === `/${name.toLowerCase()}` ? styles.selected : "";
  }

  return (
    <div className={styles.container}> 
        <div>
          <Link href="/"><a className={onPathname("")}>Download</a></Link>
        </div>
        <div>
            <Link href="/about"><a className={onPathname("about")}>About</a></Link>
            {/* <Link href="/guide"><a className={onPathname("guide")}>Guide</a></Link> */}
        </div>
    </div>
  )
}

export default Navbar