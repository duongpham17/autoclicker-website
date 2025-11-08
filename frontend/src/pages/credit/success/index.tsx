import stylse from './Success.module.scss';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className={stylse.container}>
      <Link to="/">Thank you for the payment.</Link>
    </div>
  )
}

export default Success