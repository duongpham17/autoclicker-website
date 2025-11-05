import styles from './Style1.module.scss';
import React from 'react';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  color?: "dark",
  label1?: string | number, 
  options: string[],
};

const Input = ({label1, options}:Props) => {
    
  return (
    <div className={styles.container}>

        <p>{label1}</p>

        <select key={label1} >
            {options.map(el => <option key={el} value={el}>{el}</option>)}
        </select>

    </div>
  )
}

export default Input