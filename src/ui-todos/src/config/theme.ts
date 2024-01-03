export const theme = {
    token: {
        colorPrimary: '#767df9',
        colorInfo: '#767df9',
        colorSuccess: '#83c262',
        colorWarning: '#efb644',
        colorError: '#e17677',
        colorBgBase: '#fafafa',
        colorTextBase: '#0b0b0b'
    },
    components: {
        Button: {
            colorLinkHover: 'rgb(161, 169, 255)'
        }
    }
};

export const lightTheme = {
    token: {
        colorPrimary: '#767df9',
        colorInfo: '#767df9',
        colorSuccess: '#83c262',
        colorWarning: '#efb644',
        colorError: '#e17677',
        colorBgBase: '#fff',
        colorBgContainer: '#fafafa',
        colorTextBase: '#0b0b0b',
        borderRadius: 8
    },
    components: {
        Button: {
            colorLinkHover: 'rgb(161, 169, 255)'
        }
    },
    algorithm: 'light'
};

export const darkTheme = {
    token: {
        colorPrimary: '#858cf7',
        colorInfo: '#858cf7',
        colorSuccess: '#83c262',
        colorWarning: '#efb644',
        colorError: '#e17677',
        colorBgBase: '#121212',
        colorBgContainer: 'rgb(20,26,31)',
        colorTextBase: '#fff',
        borderRadius: 8
    },
    components: {
        Button: {
            colorLinkHover: 'rgb(161, 169, 255)',
            primaryShadow: 'none'
        },
        Select: {
            optionSelectedBg: 'rgba(58,58,58,0.58)'
        },
        Card: {
            colorBgContainer: '#121212',
            border: 'none',
            outline: 'none'
        },
        Divider: {
            colorSplit: 'rgba(250, 226, 206, 0.2)'
        },
        Progress: {
            remainingColor: 'rgba(112, 112, 112, 0.46)'
        }
    },
    algorithm: 'dark'
};
