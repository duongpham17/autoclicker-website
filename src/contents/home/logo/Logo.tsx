import styles from './Logo.module.scss';
import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className={styles.container}>
        <Image src="/images/logo.png" width="200" height="200" alt="logo" />
    </div>
  )
}

export default Logo