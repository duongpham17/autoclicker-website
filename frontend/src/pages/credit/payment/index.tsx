import styles from './Payment.module.scss';
import React, { useState } from 'react';
import { environment, stripe_publishable, base_url_frontend} from 'environment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { api } from '@redux/api';
import Button from '@components/buttons/Style1';

const Publishable_stripe_key = stripe_publishable[environment];
const stripePromise = loadStripe(Publishable_stripe_key);

const CheckoutForm = ({clientSecret}: {clientSecret: string}) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${base_url_frontend[environment]}/credit/success`,
      },
    });

    if (error) {
      return console.error(error.message);
    };

    try{
      await api.post('/orders', {clientSecret})
    } catch(err:any){
      console.log(err.response.data)
    };

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <br/>
      <Button label1="Pay" disabled={!stripe} type='submit' color='primary' loading={loading} />
    </form>
  );
};

const Payment = () => {

  const [clientSecret, setClientSecret] = useState<any>("");
  const [selected, setSelected] = useState<number>(0)

  const onSelectCredit = async (credit: number) => {
    try{
      setSelected(credit);
      const res = await api.post('/stripe/credit', {credit});
      setClientSecret(res.data.clientSecret as string);
    } catch(err){
      console.log(err);
    }
  };

  const options = {
    clientSecret,
  };

  return (
    <div className={styles.container}>

      <div className={styles.credits}>
        <h2>Buy Credit</h2>
        <div>
          <button onClick={() => onSelectCredit(1)} className={selected===1?styles.selected:""}> 1 = £2</button>
          <button onClick={() => onSelectCredit(2)} className={selected===2?styles.selected:""}> 2 = £4</button>
          <button onClick={() => onSelectCredit(3)} className={selected===3?styles.selected:""}> 3 = £6</button>
          <button onClick={() => onSelectCredit(4)} className={selected===4?styles.selected:""}> 4 = £8</button>
          <button onClick={() => onSelectCredit(5)} className={selected===5?styles.selected:""}> 5 = £10</button>
        </div>
      </div>

      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
