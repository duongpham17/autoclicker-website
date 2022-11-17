import styles from './Footer.module.scss';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.container}>

        <div>	
          <p>&#169; 2022, Autolickers.co.uk</p>
          <div>
            <Link href="/contact"><a>Contact</a></Link>
            <Link href="/about"><a>About</a></Link>
          </div>
        </div>

    </footer>
  )
}

export default Footer