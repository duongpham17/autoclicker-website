import styles from './Credit.module.scss';
import React, { useState } from 'react';
import { environment, stripe_publishable_key, base_url_frontend} from 'environment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { api } from '@redux/api';
import Button from '@components/buttons/Style1';
import Container from '@components/containers/Style1';
import Wrap from '@components/flex/Wrap';
import Text from '@components/texts/Style2';

const stripe_key = stripe_publishable_key[environment];

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
        return_url: `${base_url_frontend[environment]}/success`,
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
    <Container>
      <form onSubmit={handleSubmit}>
        <PaymentElement /><br/>
        <Button disabled={!stripe} type='submit' color='primary' loading={loading}>Pay</Button>
      </form>
    </Container>
  );
};

const Payment = () => {

  const [clientSecret, setClientSecret] = useState<any>("");
  const [selected, setSelected] = useState<number>(0);
  const cost = [1,2,3,4,5];

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
      
      <Container>
        <Text size={25}>Buy credits</Text>
        <Wrap>
          {cost.map(el => 
            <Button color={el===selected?"selected":"dark"} key={el} onClick={() => onSelectCredit(el)}>
              <Text size={14}>{el} = £{el*5}</Text>
            </Button>
          )}
        </Wrap>
      </Container>

      {clientSecret && (
        <Elements key={clientSecret} stripe={loadStripe(stripe_key)} options={options}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}

    </div>
  );
};

export default Payment;
