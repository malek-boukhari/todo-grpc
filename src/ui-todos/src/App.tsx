import type { ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { router } from './routing/Router';
import { lightTheme, darkTheme } from './config/theme';
import { useAppSettingsStore } from './store/AppSettings.store.ts';
import { useEffect, useState } from 'react';

function App(): ReactElement {
    const { isDarkMode } = useAppSettingsStore();
    const [theme, setTheme] = useState(lightTheme);

    useEffect(() => {
        const customTheme = isDarkMode ? darkTheme : lightTheme;
        setTheme(customTheme);
    }, [isDarkMode]);

    return (
        <ConfigProvider theme={{ token: theme.token, components: theme.components }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}

export default App;
