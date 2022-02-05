import React, { createContext, useContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";

type AppContextProp = {
    userEmail: string | undefined;
};

const InitialAppContext: AppContextProp = {
    userEmail: undefined,
};

const AppContext = createContext(InitialAppContext);
export const useAppContext = () => {
    useContext(AppContext);
};

export default function AppProvider({ children }: { children: JSX.Element }) {
    const cookies = new Cookies();
    const [userEmail, setUserEmail] = useState(undefined);

    useEffect(() => {
        const email = cookies.get("email");
        if (email) {
            setUserEmail(email);
        }
        return;
    }, []);

    const appContext = {
        userEmail,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
