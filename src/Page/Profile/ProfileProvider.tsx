import React, { createContext, useContext, useState, useEffect } from "react";
import { useAppContext } from "../../App/AppProvider";
import { ChildrenProp } from "../../Type";

type ProfileContextProp = {};

const InitialProfileContext: ProfileContextProp = {};

const ProfileContext = createContext(InitialProfileContext);
export function useProfileContext() {
    return useContext(ProfileContext);
}

export default function ProfileProvider({ children }: ChildrenProp) {
    const { allVote } = useAppContext();

    const profileContext = {};

    return (
        <ProfileContext.Provider value={profileContext}>
            {children}
        </ProfileContext.Provider>
    );
}
