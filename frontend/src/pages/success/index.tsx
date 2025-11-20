import stylse from './Success.module.scss';
import Confetti from 'react-confetti'
import { Link } from 'react-router-dom';
import useWindowSize from '@hooks/useWindow';
import Text from '@components/texts/Style1';

const Success = () => {

  const {width, height} = useWindowSize()

  return (
    <div className={stylse.container}>
      <Confetti width={width} height={height} />
      <Link to="/profile"><Text size={25}>Thank you, the payment was succesful.</Text></Link>
    </div>
  )
}

export default Success