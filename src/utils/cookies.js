function saveAuthToCookie(value) {
    document.cookie = `access_auth=${value}; path=/;`;
}

function saveUserToCookie(value) {
    document.cookie = `access_user=${value}; path=/;`;
}

function getAuthFromCookie() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)access_auth\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
}

function getUserFromCookie() {
    const cookie = document.cookie.replace(
        /(?:(?:^|.*;\s*)access_user\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
    );
    return cookie;
}

function deleteCookie(value) {
    document.cookie = `${value}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
    saveAuthToCookie,
    saveUserToCookie,
    getAuthFromCookie,
    getUserFromCookie,
    deleteCookie,
};
