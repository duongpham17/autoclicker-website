import styles from './Orders.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import Orders from '@redux/actions/orders';
import Cover from '@components/covers/Style2';

const History = () => {
    const dispatch = useAppDispatch();

    const {orders} = useAppSelector(state => state.orders);

    useEffect(() => {
        ( async () => {
            dispatch(Orders.find())
        })();
    }, [dispatch]);

    const total = useMemo(() => {
        if(!orders || !orders.length) return 0;
        const total = orders.map(el => el.credit * 2).reduce((arr, cur) => arr + cur);
        return total
    }, [orders])

    return ( !orders ? <div></div> :
        <div className={styles.history}>
            <h3>Purchase History [ {orders.length} ] [ Total: £{total} ]</h3>
            {orders.map((el, index) => 
                <div key={el._id}>
                    <p>{index+1}. {new Date(el.createdAt).toDateString()}</p>
                    <p>£{(el.credit * 2).toFixed(2)} - Credit [ {el.credit} ]</p>
                    <p>{el.email}</p>
                </div>
            )}
        </div>
    )
}

const OrdersCredit = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
            <button className={styles.getPaymentBtn} onClick={() => setOpen(!open)}>Payment History</button>

            {open &&
                <Cover open={open} onClose={() => setOpen(false)}>
                    <History />
                </Cover>
            }
        </div>
    )
}

export default OrdersCredit