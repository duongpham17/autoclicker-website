import styles from './Center.module.scss'
import React from 'react'

const Center = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            {children}
        </div>
    </div>
  )
}

export default Center