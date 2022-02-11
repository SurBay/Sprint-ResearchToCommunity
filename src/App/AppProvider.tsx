import React, { createContext, useContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { initializeKakaoSDK } from "../Util/kakao.util";
import { isUserConnectOnMobile } from "../Util/environment";
import { ModalType } from "../Enum";
import { ChildrenProp } from "../Type";

type AppContextProp = {
    modalType: ModalType | null;
    userEmail: string | undefined;
    firstVisitFlag: boolean;
    connectOnMobile: boolean;
    setModalType: (modalType: ModalType | null) => void;
    setFirstVisitFlag: (state: boolean) => void;
};

const InitialAppContext: AppContextProp = {
    modalType: null,
    userEmail: undefined,
    firstVisitFlag: true,
    connectOnMobile: true,
    setModalType: () => {},
    setFirstVisitFlag: () => {},
};

const AppContext = createContext(InitialAppContext);
export function useAppContext() {
    return useContext(AppContext);
}

export default function AppProvider({ children }: ChildrenProp) {
    const cookies = new Cookies();
    const [modalType, setModalType] = useState<ModalType | null>(null);
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
        modalType,
        userEmail,
        firstVisitFlag,
        connectOnMobile,
        setModalType,
        setFirstVisitFlag,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
