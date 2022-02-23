export function isUserConnectOnMobile() {
    const userAgent = navigator.userAgent;

    // if mobile
    if (
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            userAgent
        )
    ) {
        return true;
    }

    // if tablet
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
        return true;
    }

    // else
    return false;
}

export function isUserConnectOnIOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/ip(hone|od|ad)/.test(userAgent)) {
        return true;
    }
    return false;
}
