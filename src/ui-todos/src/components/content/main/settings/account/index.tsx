import { JSX } from 'react';
import { Button, Typography } from 'antd';
import { useUserStore } from '../../../../../store/User.store.ts';
import DeleteUser from './DeleteUser.tsx';

function Account(): JSX.Element {
    const { setShowDeleteUser } = useUserStore();

    const { Text } = Typography;

    return (
        <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <DeleteUser />

            <Text>Delete the account</Text>
            <Button danger onClick={() => setShowDeleteUser(true)}>
                Delete account
            </Button>
        </section>
    );
}

export default Account;
