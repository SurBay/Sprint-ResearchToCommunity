import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function LandingPageRedirector() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    useEffect(() => {
        const redirectVoteId = params.get("voteId");
        if (redirectVoteId) {
            navigate("/", { replace: true, state: redirectVoteId });
        } else {
            navigate("/", { replace: true });
        }
        return () => {};
    }, []);

    return <></>;
}
