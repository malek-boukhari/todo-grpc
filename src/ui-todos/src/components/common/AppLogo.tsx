// @ts-nocheck
import { JSX } from 'react';
import { Link } from 'react-router-dom';

function AppLogo(): JSX.Element {
    return (
        <Link to={'/'} style={{ display: 'flex', marginRight: 'auto' }}>
            <img width={100} height={56} src={'/todo_logo.svg'} />
        </Link>
    );
}

export default AppLogo;
