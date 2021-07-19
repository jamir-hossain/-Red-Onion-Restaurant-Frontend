import cookie from 'js-cookie'

// Set in Cookie
export const setCookie = (key, value) => {
    if (window !== 'undefiend') {
        cookie.set(key, value, {
            // 1 Day
            expires: 1
        }) 
    }
}
// remove from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};


// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (token, next) => {
    setCookie('redOnionToken', token);
    setLocalStorage('redOnionUser', token);
    next();
};

// Access user info from localstorage
export const isAuthenticated = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('redOnionToken');
        if (cookieChecked) {
            if (localStorage.getItem('redOnionUser')) {
                return JSON.parse(localStorage.getItem('redOnionUser'));
            } else {
                return false;
            }
        }
    }
};

export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('redOnionUser'));
        auth = response.data;
        localStorage.setItem('redOnionUser', JSON.stringify(auth));
    }
    next();
};