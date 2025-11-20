import { useAppSelector } from '@redux/hooks/useRedux';

const Username = () => {

    const {user} = useAppSelector(state => state.authentications);

    return (
        <>
            <p>Credits: {user?.credit}</p>
        </>
    )
}

export default Username