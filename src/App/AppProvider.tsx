import React, { createContext, useContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { initializeKakaoSDK } from "../Util/kakao.util";
import { isUserConnectOnMobile } from "../Util/environment";

type AppContextProp = {
    userEmail: string | undefined;
    connectOnMobile: boolean;
};

const InitialAppContext: AppContextProp = {
    userEmail: undefined,
    connectOnMobile: true,
};

const AppContext = createContext(InitialAppContext);
export function useAppContext() {
    return useContext(AppContext);
}

export default function AppProvider({ children }: { children: JSX.Element }) {
    const cookies = new Cookies();
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
    const [connectOnMobile, setConnectOnMobile] = useState<boolean>(true);

    useEffect(() => {
        if (!isUserConnectOnMobile()) {
            setConnectOnMobile(false);
        } else {
            initializeKakaoSDK();

            const email = cookies.get("email");
            if (email) {
                setUserEmail(email);
            }
        }
        return;
    }, []);

    const appContext = {
        userEmail,
        connectOnMobile,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
