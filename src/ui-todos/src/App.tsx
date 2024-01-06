import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { router } from './routing/Router';
import { lightTheme, darkTheme } from './config/theme';
import { useAppSettingsStore } from './store/AppSettings.store.ts';
import Spinner from './components/common/Spinner.tsx';
import type { ReactElement } from 'react';

function App(): ReactElement {
    const { isDarkMode } = useAppSettingsStore();
    const { isLoading } = useAppSettingsStore();

    const [theme, setTheme] = useState(lightTheme);

    useEffect(() => {
        const customTheme = isDarkMode ? darkTheme : lightTheme;
        setTheme(customTheme);
    }, [isDarkMode]);

    return (
        <ConfigProvider theme={{ token: theme.token, components: theme.components }}>
            {isLoading && <Spinner />}
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}

export default App;
