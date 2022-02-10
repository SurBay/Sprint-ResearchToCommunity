import React, { createContext, useContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { initializeKakaoSDK } from "../Util/kakao.util";
import { isUserConnectOnMobile } from "../Util/environment";
import { ChildrenProp } from "../Type";

type AppContextProp = {
    userEmail: string | undefined;
    firstVisitFlag: boolean;
    connectOnMobile: boolean;
    setFirstVisitFlag: (state: boolean) => void;
};

const InitialAppContext: AppContextProp = {
    userEmail: undefined,
    firstVisitFlag: true,
    connectOnMobile: true,
    setFirstVisitFlag: () => {},
};

const AppContext = createContext(InitialAppContext);
export function useAppContext() {
    return useContext(AppContext);
}

export default function AppProvider({ children }: ChildrenProp) {
    const cookies = new Cookies();
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
    const [firstVisitFlag, setFirstVisitFlag] = useState<boolean>(true);
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
        firstVisitFlag,
        connectOnMobile,
        setFirstVisitFlag,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
