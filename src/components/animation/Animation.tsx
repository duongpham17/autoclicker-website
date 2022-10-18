import styles from './Animation.module.scss';
import React from 'react';;

interface Props {
  children: React.ReactNode
};

const Animation = ({children}: Props) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Animation