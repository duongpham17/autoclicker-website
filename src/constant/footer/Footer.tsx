import styles from './Footer.module.scss';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.container}>
        <footer>
            <div>
                <p>	&#169; 2022, Autolickers.co.uk</p>
            </div>
            <div>
                <Link href="/contact"><a>Contact</a></Link>
            </div>
        </footer>
    </div>
  )
}

export default Footer