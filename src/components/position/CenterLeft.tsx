import styles from './CenterLeft.module.scss'
import React from 'react'

const CenterLeft = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            {children}
        </div>
    </div>
  )
}

export default CenterLeft