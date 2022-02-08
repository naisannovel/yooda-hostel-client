import jwt_decode from 'jwt-decode';

export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    if (localStorage.getItem('token')) {
        const { exp } = jwt_decode(JSON.parse(localStorage.getItem('token')));
        if ((new Date()).getTime() <= exp * 1000) {
            return true;
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('_id');
            localStorage.removeItem('expirationTime');
            return false;
        }
    } else return false;
}

export const userInfo = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if(token){
        const decoded = jwt_decode(token);
        return { ...decoded, token }
    }else{
        return false;
    }
}

export const logOut = (cb) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    cb();
}