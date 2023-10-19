import { createContext, useState } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState({
        name: '',
        username: '',
        admin: false,
        avatar: '',
        background: '',
        email: '',
        phone: '',
        token: '',
    });

    return (
        <DataContext.Provider
            value={{
                account,
                setAccount,
            }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
