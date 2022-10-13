import styles from './Github.module.scss';
import React from 'react';
import {BsGithub} from 'react-icons/bs';

const Github = () => {
  return (
    <div className={styles.container}>
        <a href="https://github.com/duongpham17/autoclicker-pro" target="_blank" rel="noopener noreferrer">
            <span><BsGithub/></span>
            <span>Github</span>
        </a>
    </div>
  )
}

export default Github