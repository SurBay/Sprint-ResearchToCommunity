import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../App/AppProvider";
import { API_ENDPOINT } from "../../Constant";

export function LandingPageRedirector() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { setCookie, setLandingType } = useAppContext();

    useEffect(() => {
        const redirectVoteId = params.get("voteId");
        const landingType = params.get("route");
        axios.patch(`${API_ENDPOINT}/api/funnel`, { landingType });
        if (landingType) {
            switch (landingType) {
                case "paidAd" ||
                    "Insta" ||
                    "AppNotice" ||
                    "PPo" ||
                    "koPas" ||
                    "kakao" ||
                    "EveryTime" ||
                    "seyoen" ||
                    "Dang":
                    setLandingType(landingType);
                    setCookie("landingType", landingType);
                    break;
                default:
                    break;
            }
        }
        if (redirectVoteId) {
            navigate("/", { replace: true, state: { redirectVoteId } });
        } else {
            navigate("/", { replace: true });
        }
        return () => {};
    }, []);

    return <></>;
}
