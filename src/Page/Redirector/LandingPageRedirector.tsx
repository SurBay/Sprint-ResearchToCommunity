import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function LandingPageRedirector() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    useEffect(() => {
        navigate("/", { replace: true, state: { voteId: "123123" } });
        return () => {};
    }, []);

    return <>리다이렉트 페이지입니다.</>;
}
